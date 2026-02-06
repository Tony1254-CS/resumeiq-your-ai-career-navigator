import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const AnalysisLoader = () => {
  const steps = [
    "Parsing resume content...",
    "Extracting key skills...",
    "Analyzing job requirements...",
    "Computing semantic similarity...",
    "Generating insights...",
  ];

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        className="relative mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-20 h-20 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-transparent border-t-primary" />
        <Brain className="absolute inset-0 m-auto h-8 w-8 text-primary" />
      </motion.div>

      <motion.p
        className="font-display font-semibold text-foreground text-lg mb-6"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        AI is analyzing your resume...
      </motion.p>

      <div className="space-y-2 w-full max-w-sm">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.5 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ delay: i * 0.5 + 0.3, duration: 0.5 }}
            />
            <span className="text-sm text-muted-foreground">{step}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisLoader;
