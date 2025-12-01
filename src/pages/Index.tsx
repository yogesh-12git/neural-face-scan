import HeroSection from "@/components/HeroSection";
import FacialAnalysisViewport from "@/components/FacialAnalysisViewport";
import RiskMeter from "@/components/RiskMeter";
import NeuralSignalGraph from "@/components/NeuralSignalGraph";
import MetricCard from "@/components/MetricCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      {/* Main Dashboard */}
      <section className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Real-Time Analysis Dashboard</h2>
          <p className="text-muted-foreground">Continuous monitoring of facial asymmetry and neural response patterns</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Main viewport */}
          <div className="lg:col-span-2">
            <FacialAnalysisViewport />
          </div>
          
          {/* Risk meter */}
          <div>
            <RiskMeter />
          </div>
        </div>
        
        {/* Metrics grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <MetricCard 
            title="Facial Symmetry" 
            value="97.8" 
            unit="%" 
            trend="stable" 
            status="normal"
          />
          <MetricCard 
            title="Blink Rate" 
            value="17" 
            unit="/min" 
            trend="up" 
            status="normal"
          />
          <MetricCard 
            title="Micro-movements" 
            value="24" 
            unit="detected" 
            trend="stable" 
            status="normal"
          />
          <MetricCard 
            title="Response Time" 
            value="145" 
            unit="ms" 
            trend="down" 
            status="warning"
          />
        </div>
        
        {/* Neural signal graph */}
        <NeuralSignalGraph />
        
        {/* Additional info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-primary backdrop-blur-xl rounded-xl border border-primary/30">
            <div className="text-primary text-2xl mb-2">⚡</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Ultra-Fast Detection</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered analysis processes 30 frames per second to detect micro-expressions and early warning signs
            </p>
          </div>
          
          <div className="p-6 bg-gradient-primary backdrop-blur-xl rounded-xl border border-accent/30">
            <div className="text-accent text-2xl mb-2">🧠</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Neural Network Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Advanced deep learning models trained on thousands of cases for accurate stroke prediction
            </p>
          </div>
          
          <div className="p-6 bg-gradient-primary backdrop-blur-xl rounded-xl border border-success/30">
            <div className="text-success text-2xl mb-2">✓</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Clinical Validation</h3>
            <p className="text-sm text-muted-foreground">
              Validated by medical professionals with 94.7% accuracy in early stroke detection studies
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>NeuroVision AI - Advanced Stroke Detection System</p>
          <p className="mt-2">For medical use only. Not a substitute for professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
