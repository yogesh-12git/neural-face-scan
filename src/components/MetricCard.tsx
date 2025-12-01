import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "stable";
  status?: "normal" | "warning" | "danger";
}

const MetricCard = ({ title, value, unit, icon, trend, status = "normal" }: MetricCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "warning": return "border-alert-warning/50 bg-alert-warning/5";
      case "danger": return "border-alert-danger/50 bg-alert-danger/5";
      default: return "border-border bg-card/30";
    }
  };

  const getTrendIcon = () => {
    if (trend === "up") return "↗";
    if (trend === "down") return "↘";
    return "→";
  };

  return (
    <div className={`p-4 backdrop-blur-xl rounded-lg border ${getStatusColor()} transition-all duration-300 hover:scale-105`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        {trend && (
          <span className="text-sm opacity-60">
            {getTrendIcon()}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
