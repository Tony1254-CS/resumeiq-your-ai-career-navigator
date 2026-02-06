import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ScorePanelProps {
  score: number;
  confidence: string;
}

const ScorePanel = ({ score, confidence }: ScorePanelProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = () => {
    if (score >= 80) return "hsl(var(--success))";
    if (score >= 60) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  return (
    <motion.div
      className="glass-card-hover p-8 flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="font-display font-semibold text-foreground mb-6 text-lg">AI Match Score</h3>
      
      <div className="relative w-48 h-48 mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100" cy="100" r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="8"
          />
          <circle
            cx="100" cy="100" r={radius}
            fill="none"
            stroke={getScoreColor()}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="score-ring"
            style={{ filter: `drop-shadow(0 0 8px ${getScoreColor()})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-display font-bold text-foreground">{animatedScore}</span>
          <span className="text-sm text-muted-foreground">out of 100</span>
        </div>
      </div>

      <div className="glass-card px-4 py-2 text-sm">
        <span className="text-muted-foreground">Confidence: </span>
        <span className="text-primary font-medium">{confidence}</span>
      </div>
    </motion.div>
  );
};

export default ScorePanel;
