interface RiskMeterProps {
  riskLevel: number;
}

const RiskMeter = ({ riskLevel }: RiskMeterProps) => {
  const risk = riskLevel;

  const getRiskColor = () => {
    if (risk < 30) return "hsl(var(--success-green))";
    if (risk < 60) return "hsl(var(--alert-warning))";
    return "hsl(var(--alert-danger))";
  };

  const getRiskLabel = () => {
    if (risk < 30) return "Low Risk";
    if (risk < 60) return "Moderate Risk";
    return "High Risk";
  };

  return (
    <div className="p-6 bg-card/50 backdrop-blur-xl rounded-xl border border-border">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Stroke Risk Assessment</h3>
      
      <div className="relative w-full h-40 mb-4">
        <svg viewBox="0 0 200 120" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="20"
            strokeLinecap="round"
          />
          
          {/* Risk level arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={getRiskColor()}
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={`${risk * 2.51} 251`}
            className="transition-all duration-1000 ease-out"
            style={{ filter: `drop-shadow(0 0 8px ${getRiskColor()})` }}
          />
          
          {/* Center text */}
          <text x="100" y="85" textAnchor="middle" className="text-3xl font-bold fill-foreground">
            {risk.toFixed(0)}%
          </text>
          <text x="100" y="105" textAnchor="middle" className="text-sm fill-muted-foreground">
            {getRiskLabel()}
          </text>
        </svg>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center">
          <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: "hsl(var(--success-green))" }} />
          <div className="text-muted-foreground">0-30%</div>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: "hsl(var(--alert-warning))" }} />
          <div className="text-muted-foreground">30-60%</div>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: "hsl(var(--alert-danger))" }} />
          <div className="text-muted-foreground">60-100%</div>
        </div>
      </div>
    </div>
  );
};

export default RiskMeter;
