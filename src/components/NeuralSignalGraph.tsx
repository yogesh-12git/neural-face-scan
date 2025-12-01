import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const NeuralSignalGraph = () => {
  const [data, setData] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      time: i,
      signal: 50 + Math.random() * 20,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), {
          time: prev[prev.length - 1].time + 1,
          signal: 50 + Math.random() * 20,
        }];
        return newData;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-card/50 backdrop-blur-xl rounded-xl border border-border">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Neural Response Signals</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))" 
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <Line 
            type="monotone" 
            dataKey="signal" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
            style={{ filter: "drop-shadow(0 0 4px hsl(var(--primary)))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NeuralSignalGraph;
