import heroImage from "@/assets/hero-medical-ai.png";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-primary/30 mb-8 animate-float">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-primary font-medium">AI-Powered Early Detection</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
          NeuroVision AI
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8">
          Real-time facial analysis for early stroke detection using advanced neural networks 
          and micro-expression recognition technology
        </p>
        
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold shadow-glow hover:shadow-neural transition-all duration-300 hover:scale-105">
            Start Analysis
          </button>
          <button className="px-8 py-4 bg-card/50 backdrop-blur-xl border border-border text-foreground rounded-lg font-semibold hover:bg-card transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
