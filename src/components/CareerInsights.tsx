import { motion } from "framer-motion";
import { TrendingUp, AlertCircle, User } from "lucide-react";

interface CareerInsightsProps {
  strengths: string[];
  risks: string[];
  summary: string;
}

const CareerInsights = ({ strengths, risks, summary }: CareerInsightsProps) => {
  return (
    <motion.div
      className="glass-card-hover p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="font-display font-semibold text-foreground mb-5 text-lg flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        Career Intelligence
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div>
          <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-success" /> Strengths
          </p>
          <ul className="space-y-1.5">
            {strengths.map((s, i) => (
              <li key={i} className="text-sm text-foreground/80 flex gap-2">
                <span className="text-success mt-1.5 shrink-0">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 text-warning" /> Risk Areas
          </p>
          <ul className="space-y-1.5">
            {risks.map((r, i) => (
              <li key={i} className="text-sm text-foreground/80 flex gap-2">
                <span className="text-warning mt-1.5 shrink-0">•</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-primary/5 border border-primary/15">
        <p className="text-xs text-primary uppercase tracking-wider mb-2 font-medium">Hiring Manager Perspective</p>
        <p className="text-sm text-foreground/80 leading-relaxed">{summary}</p>
      </div>
    </motion.div>
  );
};

export default CareerInsights;
