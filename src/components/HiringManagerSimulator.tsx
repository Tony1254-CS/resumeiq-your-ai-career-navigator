import { motion } from "framer-motion";
import { UserCheck, UserX, UserMinus, Shield, AlertTriangle, ThumbsUp, ThumbsDown, Briefcase } from "lucide-react";

interface HiringManagerSimulatorProps {
  decision: "Yes" | "Maybe" | "No";
  feedback: string;
  strengths: string[];
  risks: string[];
  alternativeRoles: string[];
}

const decisionConfig = {
  Yes: {
    icon: UserCheck,
    label: "Shortlisted",
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/30",
    glow: "shadow-[0_0_30px_hsl(var(--success)/0.15)]",
    description: "This candidate would likely advance to the next round",
  },
  Maybe: {
    icon: UserMinus,
    label: "Under Review",
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
    glow: "shadow-[0_0_30px_hsl(var(--warning)/0.15)]",
    description: "This candidate may advance depending on the applicant pool",
  },
  No: {
    icon: UserX,
    label: "Not Shortlisted",
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    glow: "shadow-[0_0_30px_hsl(var(--destructive)/0.15)]",
    description: "This candidate would likely not advance with the current resume",
  },
};

const HiringManagerSimulator = ({ decision, feedback, strengths, risks, alternativeRoles }: HiringManagerSimulatorProps) => {
  const config = decisionConfig[decision];
  const DecisionIcon = config.icon;

  return (
    <motion.div
      className="glass-card-hover p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <h3 className="font-display font-semibold text-foreground mb-5 text-lg flex items-center gap-2">
        <Shield className="h-5 w-5 text-accent" />
        Hiring Manager Simulator
      </h3>

      {/* Decision Badge */}
      <motion.div
        className={`p-5 rounded-xl border ${config.bg} ${config.border} ${config.glow} mb-6`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-12 h-12 rounded-full ${config.bg} border ${config.border} flex items-center justify-center`}>
            <DecisionIcon className={`h-6 w-6 ${config.color}`} />
          </div>
          <div>
            <p className={`font-display font-bold text-lg ${config.color}`}>{config.label}</p>
            <p className="text-xs text-muted-foreground">{config.description}</p>
          </div>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed italic">"{feedback}"</p>
      </motion.div>

      {/* Strengths and Risks side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div>
          <p className="text-sm text-muted-foreground mb-2.5 flex items-center gap-1.5 font-medium">
            <ThumbsUp className="h-3.5 w-3.5 text-success" /> Top Strengths
          </p>
          <ul className="space-y-2">
            {strengths.slice(0, 4).map((s, i) => (
              <motion.li
                key={i}
                className="text-sm text-foreground/80 flex gap-2 p-2 rounded-lg bg-success/5 border border-success/10"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.06 }}
              >
                <span className="text-success shrink-0 mt-0.5">✓</span>
                {s}
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2.5 flex items-center gap-1.5 font-medium">
            <ThumbsDown className="h-3.5 w-3.5 text-destructive" /> Key Concerns
          </p>
          <ul className="space-y-2">
            {risks.slice(0, 4).map((r, i) => (
              <motion.li
                key={i}
                className="text-sm text-foreground/80 flex gap-2 p-2 rounded-lg bg-destructive/5 border border-destructive/10"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.06 }}
              >
                <AlertTriangle className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
                {r}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Alternative Roles */}
      {alternativeRoles.length > 0 && (
        <motion.div
          className="p-4 rounded-lg bg-accent/5 border border-accent/15"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-xs text-accent uppercase tracking-wider mb-3 font-medium flex items-center gap-1.5">
            <Briefcase className="h-3 w-3" /> Better-Fit Roles for Your Profile
          </p>
          <div className="flex flex-wrap gap-2">
            {alternativeRoles.map((role, i) => (
              <motion.span
                key={i}
                className="text-sm px-3 py-1.5 rounded-full glass-card border-accent/20 text-foreground/80 hover:border-accent/40 transition-colors cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.08 }}
              >
                {role}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HiringManagerSimulator;
