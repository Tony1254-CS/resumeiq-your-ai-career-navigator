import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, FileSearch, Target, GitCompare, Sparkles, CheckCircle2 } from "lucide-react";

const stages = [
  { icon: FileSearch, label: "Parsing resume structure", detail: "Extracting skills, experience, and qualifications" },
  { icon: Brain, label: "Understanding job requirements", detail: "Analyzing key competencies and role expectations" },
  { icon: GitCompare, label: "Mapping skills and experience", detail: "Computing semantic similarity across dimensions" },
  { icon: Target, label: "Evaluating gaps", detail: "Identifying missing skills and improvement areas" },
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
    }, 2200);
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
          className="w-24 h-24 rounded-full border-2 border-primary/20 flex items-center justify-center"
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
          </motion.div>
          <Brain className="h-10 w-10 text-primary" />
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Analyzing...</span>
          <span>{Math.round(progress)}%</span>
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
      <div className="space-y-3 w-full">
        {stages.map((stage, i) => {
          const isComplete = i < currentStage;
          const isActive = i === currentStage;
          const Icon = isComplete ? CheckCircle2 : stage.icon;

          return (
            <motion.div
              key={stage.label}
              className={`flex items-start gap-4 p-3 rounded-lg transition-all duration-300 ${
                isActive ? "glass-card border-primary/30" : isComplete ? "opacity-60" : "opacity-30"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isActive ? 1 : isComplete ? 0.6 : 0.3, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
            >
              <motion.div
                className={`shrink-0 mt-0.5 ${isComplete ? "text-success" : isActive ? "text-primary" : "text-muted-foreground"}`}
                animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <div>
                <p className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {stage.label}
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
