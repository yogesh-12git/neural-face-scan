import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface RiskAlertProps {
  riskLevel: number;
}

const RiskAlert = ({ riskLevel }: RiskAlertProps) => {
  const [show, setShow] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    if (riskLevel >= 70) {
      setShow(true);
      
      // Play alert sound
      if (!audioPlayed) {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZTA0PVrLq7axYFgpJouHzwm8hBTCFz/PVhzMGHmy/7+OZTA0PVrLq7a1YFgpJouHzwm8hBTCFz/PVhzMGHmy/7+OZTA0PVrLq7a1YFgpJouHzwm8hBTCFz/PVhzMGHmy/7+OZTA0PVrLq7a1YFgpJouHzwm8hBTCFz/PVhzMGHmy/7+OZTA0PVrLq7a1YFgpJouHzwm8hBTCFz/PVhzMGHmy/7+OZTA0PVrLq7a1YFgpJouHzwm8hBTCFz/PVhzMGHmy/7+OZTA0PVrLq7a1YFgpJouHzwm8hBTCFz/PVhzMGHm');
        audio.play().catch(() => {
          // Ignore autoplay errors
        });
        setAudioPlayed(true);
      }
    } else {
      setShow(false);
      setAudioPlayed(false);
    }
  }, [riskLevel, audioPlayed]);

  if (!show) return null;

  return (
    <Alert variant="destructive" className="animate-pulse-slow border-2 shadow-danger">
      <AlertCircle className="h-5 w-5" />
      <AlertTitle className="text-lg font-bold">High Stroke Risk Detected</AlertTitle>
      <AlertDescription className="text-base">
        Immediate medical attention recommended. Contact emergency services or visit the nearest hospital.
      </AlertDescription>
    </Alert>
  );
};

export default RiskAlert;
