import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface RewriteAssistantProps {
  original: string;
  improved: string;
}

const RewriteAssistant = ({ original, improved }: RewriteAssistantProps) => {
  return (
    <motion.div
      className="glass-card-hover p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="font-display font-semibold text-foreground mb-5 text-lg flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        AI Rewrite Assistant
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">Original</p>
          <p className="text-sm text-foreground/70 leading-relaxed">{original}</p>
        </div>

        <div className="relative p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 hidden md:block">
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
          <p className="text-xs text-primary uppercase tracking-wider mb-2 font-medium">AI Improved</p>
          <p className="text-sm text-foreground leading-relaxed">{improved}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RewriteAssistant;
