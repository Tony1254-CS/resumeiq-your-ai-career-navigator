import { motion } from "framer-motion";
import { TrendingUp, AlertCircle, User, MessageSquare } from "lucide-react";

interface CareerInsightsProps {
  strengths: string[];
  risks: string[];
  summary: string;
  hiringFeedback?: string;
}

const CareerInsights = ({ strengths, risks, summary, hiringFeedback }: CareerInsightsProps) => {
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
              <motion.li
                key={i}
                className="text-sm text-foreground/80 flex gap-2"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
              >
                <span className="text-success mt-1.5 shrink-0">•</span>
                {s}
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 text-warning" /> Risk Areas
          </p>
          <ul className="space-y-1.5">
            {risks.map((r, i) => (
              <motion.li
                key={i}
                className="text-sm text-foreground/80 flex gap-2"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
              >
                <span className="text-warning mt-1.5 shrink-0">•</span>
                {r}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/15">
          <p className="text-xs text-primary uppercase tracking-wider mb-2 font-medium flex items-center gap-1.5">
            <User className="h-3 w-3" /> Hiring Manager Perspective
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed">{summary}</p>
        </div>

        {hiringFeedback && (
          <motion.div
            className="p-4 rounded-lg bg-accent/5 border border-accent/15"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-xs text-accent uppercase tracking-wider mb-2 font-medium flex items-center gap-1.5">
              <MessageSquare className="h-3 w-3" /> Direct Feedback
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed italic">"{hiringFeedback}"</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CareerInsights;
