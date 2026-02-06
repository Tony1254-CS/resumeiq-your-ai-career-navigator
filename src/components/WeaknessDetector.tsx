import { motion } from "framer-motion";
import { AlertTriangle, Lightbulb } from "lucide-react";

interface WeaknessDetectorProps {
  suggestions: string[];
}

const WeaknessDetector = ({ suggestions }: WeaknessDetectorProps) => {
  return (
    <motion.div
      className="glass-card-hover p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="font-display font-semibold text-foreground mb-5 text-lg flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-warning" />
        Resume Improvement Areas
      </h3>

      <div className="space-y-3">
        {suggestions.map((s, i) => (
          <motion.div
            key={i}
            className="flex gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50 hover:border-warning/20 transition-colors"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <Lightbulb className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/80">{s}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeaknessDetector;
