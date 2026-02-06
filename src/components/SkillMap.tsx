import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SkillMatch, MissingSkill } from "@/types/analysis";

interface SkillMapProps {
  matched: SkillMatch[];
  missing: MissingSkill[];
}

const SkillMap = ({ matched, missing }: SkillMapProps) => {
  return (
    <motion.div
      className="glass-card-hover p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="font-display font-semibold text-foreground mb-5 text-lg">Skill Intelligence Map</h3>

      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
          <Check className="h-4 w-4 text-success" /> Matched Skills
        </p>
        <div className="flex flex-wrap gap-2">
          {matched.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="group relative glass-card px-3 py-1.5 text-sm text-foreground border-primary/20 hover:border-primary/50 transition-colors cursor-default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              {skill.name}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 glass-card px-2 py-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {skill.relevance}% match
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
          <X className="h-4 w-4 text-destructive" /> Missing Skills
        </p>
        <div className="flex flex-wrap gap-2">
          {missing.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="group relative glass-card px-3 py-1.5 text-sm text-muted-foreground border-destructive/20 hover:border-destructive/40 transition-colors cursor-default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
            >
              {skill.name}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 glass-card px-2 py-1 text-xs text-warning opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {skill.importance} priority
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillMap;
