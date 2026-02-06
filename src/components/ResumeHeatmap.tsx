import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { ResumeSection } from "@/types/analysis";

interface ResumeHeatmapProps {
  sections: ResumeSection[];
}

const ratingConfig = {
  strong: {
    bg: "bg-success/10",
    border: "border-success/30",
    dot: "bg-success",
    label: "Strong",
    labelColor: "text-success",
    glow: "shadow-[inset_0_0_20px_hsl(var(--success)/0.08)]",
  },
  moderate: {
    bg: "bg-warning/10",
    border: "border-warning/30",
    dot: "bg-warning",
    label: "Moderate",
    labelColor: "text-warning",
    glow: "shadow-[inset_0_0_20px_hsl(var(--warning)/0.08)]",
  },
  weak: {
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    dot: "bg-destructive",
    label: "Weak",
    labelColor: "text-destructive",
    glow: "shadow-[inset_0_0_20px_hsl(var(--destructive)/0.08)]",
  },
};

const ResumeHeatmap = ({ sections }: ResumeHeatmapProps) => {
  return (
    <motion.div
      className="glass-card-hover p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <h3 className="font-display font-semibold text-foreground mb-2 text-lg flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        Resume Heatmap
      </h3>
      <p className="text-xs text-muted-foreground mb-5">
        AI analysis of each resume section's relevance to the target role
      </p>

      {/* Legend */}
      <div className="flex gap-4 mb-5">
        {(["strong", "moderate", "weak"] as const).map((r) => (
          <div key={r} className="flex items-center gap-1.5 text-xs">
            <div className={`w-2.5 h-2.5 rounded-full ${ratingConfig[r].dot}`} />
            <span className="text-muted-foreground capitalize">{r}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {sections.map((section, i) => {
          const config = ratingConfig[section.rating];
          return (
            <motion.div
              key={i}
              className={`p-4 rounded-lg border ${config.bg} ${config.border} ${config.glow} transition-all duration-300 hover:scale-[1.01]`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-sm text-foreground leading-relaxed flex-1">
                  "{section.text}"
                </p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.labelColor} border ${config.border} shrink-0`}>
                  {config.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {section.reason}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ResumeHeatmap;
