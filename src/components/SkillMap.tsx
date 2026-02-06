import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SkillMatch, MissingSkill } from "@/types/analysis";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface SkillMapProps {
  matched: SkillMatch[];
  missing: MissingSkill[];
}

const importanceToScore: Record<string, number> = {
  High: 30,
  Medium: 20,
  Low: 10,
};

const SkillMap = ({ matched, missing }: SkillMapProps) => {
  // Build radar data: matched skills at their relevance, missing skills at 0 (with a "required" field)
  const radarData = [
    ...matched.map((s) => ({
      skill: s.name,
      you: s.relevance,
      required: Math.min(100, s.relevance + 10),
    })),
    ...missing.map((s) => ({
      skill: s.name,
      you: 0,
      required: importanceToScore[s.importance] ?? 50,
    })),
  ];

  return (
    <motion.div
      className="glass-card-hover p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="font-display font-semibold text-foreground mb-5 text-lg">
        Skill Intelligence Map
      </h3>

      {/* Radar Chart */}
      <div className="w-full h-[280px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Required"
              dataKey="required"
              stroke="hsl(var(--destructive))"
              fill="hsl(var(--destructive))"
              fillOpacity={0.1}
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
            <Radar
              name="Your Skills"
              dataKey="you"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.25}
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
                fontSize: "12px",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Tags */}
      <div className="mb-4">
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
