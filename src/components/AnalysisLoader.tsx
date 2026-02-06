import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, FileSearch, Target, GitCompare, Sparkles, CheckCircle2, Shield } from "lucide-react";

const stages = [
  { icon: FileSearch, label: "Parsing resume structure", detail: "Extracting skills, experience, and qualifications" },
  { icon: Brain, label: "Understanding job requirements", detail: "Analyzing key competencies and role expectations" },
  { icon: GitCompare, label: "Mapping skills to requirements", detail: "Computing semantic similarity across dimensions" },
  { icon: Target, label: "Evaluating strengths and gaps", detail: "Identifying missing skills and improvement areas" },
  { icon: Shield, label: "Predicting hiring outcome", detail: "Simulating recruiter decision and shortlist probability" },
  { icon: Sparkles, label: "Generating insights", detail: "Creating actionable recommendations and career intelligence" },
];

const AnalysisLoader = () => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < stages.length - 1) return prev + 1;
        return prev;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const progress = ((currentStage + 1) / stages.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 w-full max-w-lg mx-auto">
      {/* Central brain animation */}
      <motion.div
        className="relative mb-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-24 h-24 rounded-full border-2 border-primary/20 flex items-center justify-center relative"
          style={{ background: "hsl(var(--glass))" }}
          animate={{ boxShadow: ["0 0 20px hsl(var(--glow-primary))", "0 0 50px hsl(var(--glow-primary))", "0 0 20px hsl(var(--glow-primary))"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/50" />
          </motion.div>
          <Brain className="h-10 w-10 text-primary relative z-10" />
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span className="font-medium">Analyzing your profile...</span>
          <span className="font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ boxShadow: "0 0 12px hsl(var(--glow-primary))" }}
          />
        </div>
      </div>

      {/* Stage list */}
      <div className="space-y-2.5 w-full">
        {stages.map((stage, i) => {
          const isComplete = i < currentStage;
          const isActive = i === currentStage;
          const isPending = i > currentStage;
          const Icon = isComplete ? CheckCircle2 : stage.icon;

          return (
            <motion.div
              key={stage.label}
              className={`flex items-start gap-4 p-3 rounded-lg transition-all duration-500 ${
                isActive
                  ? "glass-card border-primary/30"
                  : isComplete
                  ? ""
                  : ""
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isPending ? 0.25 : isComplete ? 0.5 : 1,
                x: 0,
              }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <motion.div
                className={`shrink-0 mt-0.5 ${
                  isComplete ? "text-success" : isActive ? "text-primary" : "text-muted-foreground/40"
                }`}
                animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 1.2, repeat: isActive ? Infinity : 0 }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium transition-colors ${
                    isActive ? "text-foreground" : isComplete ? "text-muted-foreground" : "text-muted-foreground/40"
                  }`}
                >
                  {stage.label}
                  {isComplete && (
                    <motion.span
                      className="text-success ml-2 text-xs"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      ✓
                    </motion.span>
                  )}
                </p>
                <AnimatePresence>
                  {isActive && (
                    <motion.p
                      className="text-xs text-muted-foreground mt-0.5"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {stage.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalysisLoader;
