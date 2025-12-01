import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

const FacialAnalysisViewport = () => {
  const [scanning, setScanning] = useState(false);
  const [asymmetry, setAsymmetry] = useState(97.8);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setAsymmetry(prev => {
          const change = (Math.random() - 0.5) * 0.4;
          return Math.max(95, Math.min(99, prev + change));
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [scanning]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
        setScanning(true);
        toast({
          title: "Camera activated",
          description: "Real-time analysis started"
        });
      }
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to use this feature",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setCameraActive(false);
      setScanning(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      toast({
        title: "Analysis stopped",
        description: "Camera deactivated"
      });
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-primary/30 bg-card/30 backdrop-blur-xl">
      {/* Video feed */}
      <video 
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {!cameraActive && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-secondary/20 flex items-center justify-center z-10">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Camera not active</p>
            <Button onClick={startCamera} className="shadow-glow">
              Start Analysis
            </Button>
          </div>
        </div>
      )}
      
      {/* Scanning overlay */}
      {scanning && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent h-32 animate-scan" />
        </div>
      )}
      
      {/* Face outline and landmarks */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 640 480">
        {/* Facial outline */}
        <ellipse cx="320" cy="240" rx="120" ry="150" 
          fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.6" />
        
        {/* Left eye */}
        <circle cx="280" cy="220" r="15" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
        <circle cx="280" cy="220" r="5" fill="hsl(var(--accent))" />
        
        {/* Right eye */}
        <circle cx="360" cy="220" r="15" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
        <circle cx="360" cy="220" r="5" fill="hsl(var(--accent))" />
        
        {/* Nose */}
        <line x1="320" y1="220" x2="320" y2="260" stroke="hsl(var(--primary))" strokeWidth="2" />
        
        {/* Mouth - asymmetric to show detection */}
        <path d="M 280 300 Q 320 320 360 302" 
          fill="none" stroke="hsl(var(--alert-warning))" strokeWidth="2" />
        
        {/* Facial landmarks */}
        {[
          [280, 220], [360, 220], // Eyes
          [320, 240], [320, 260], // Nose
          [280, 300], [360, 302], // Mouth corners
          [250, 200], [390, 200], // Eyebrows
          [320, 180], // Forehead
          [280, 340], [360, 340], // Chin points
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="hsl(var(--primary))" />
        ))}
        
        {/* Asymmetry detection line */}
        <line x1="320" y1="180" x2="320" y2="380" 
          stroke="hsl(var(--alert-warning))" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
      </svg>
      
      {/* Data overlays */}
      <div className="absolute top-4 left-4 space-y-2">
        <div className="px-3 py-2 bg-card/80 backdrop-blur-md rounded-lg border border-primary/20">
          <div className="text-xs text-muted-foreground">Symmetry</div>
          <div className="text-lg font-bold text-primary">{asymmetry.toFixed(1)}%</div>
        </div>
        <div className="px-3 py-2 bg-card/80 backdrop-blur-md rounded-lg border border-accent/20">
          <div className="text-xs text-muted-foreground">Landmarks</div>
          <div className="text-lg font-bold text-accent">68/68</div>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 space-y-2">
        <div className="px-3 py-2 bg-card/80 backdrop-blur-md rounded-lg border border-success/20">
          <div className="text-xs text-muted-foreground">Blink Rate</div>
          <div className="text-lg font-bold text-success">17/min</div>
        </div>
        <div className="px-3 py-2 bg-card/80 backdrop-blur-md rounded-lg border border-border/20">
          <div className="text-xs text-muted-foreground">Micro-movements</div>
          <div className="text-lg font-bold text-foreground">Normal</div>
        </div>
      </div>
      
      {/* Bottom status bar */}
      <div className="absolute bottom-4 left-4 right-4 px-4 py-2 bg-card/80 backdrop-blur-md rounded-lg border border-border/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${scanning ? 'bg-primary animate-pulse' : 'bg-muted'}`} />
          <span className="text-sm text-foreground">
            {scanning ? 'Real-time Analysis Active' : 'Analysis Stopped'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">FPS: 30</span>
          {cameraActive && (
            <Button 
              onClick={stopCamera} 
              variant="destructive" 
              size="sm"
              className="h-7 text-xs"
            >
              Stop Camera
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacialAnalysisViewport;
