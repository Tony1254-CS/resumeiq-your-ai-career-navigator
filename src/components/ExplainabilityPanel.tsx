import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { KeywordCoverage } from "@/types/analysis";

interface ExplainabilityPanelProps {
  keywords: KeywordCoverage[];
  summary: string;
}

const ExplainabilityPanel = ({ keywords, summary }: ExplainabilityPanelProps) => {
  const covered = keywords.filter(k => k.found).length;
  const total = keywords.length;

  return (
    <motion.div
      className="glass-card-hover p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <h3 className="font-display font-semibold text-foreground mb-5 text-lg flex items-center gap-2">
        <Info className="h-5 w-5 text-accent" />
        Why This Score?
      </h3>

      <div className="mb-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Keyword Coverage</span>
          <span className="text-primary font-medium">{covered}/{total}</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(covered / total) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ boxShadow: "0 0 10px hsl(var(--glow-primary))" }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {keywords.map((kw, i) => (
          <span
            key={kw.keyword}
            className={`text-xs px-2.5 py-1 rounded-full border ${
              kw.found
                ? "border-primary/30 text-primary bg-primary/5"
                : "border-destructive/20 text-muted-foreground bg-destructive/5 line-through"
            }`}
          >
            {kw.keyword}
          </span>
        ))}
      </div>

      <p className="text-sm text-foreground/70 leading-relaxed">{summary}</p>
    </motion.div>
  );
};

export default ExplainabilityPanel;
