import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { AnalysisResult } from "@/types/analysis";
import ScorePanel from "@/components/ScorePanel";
import SkillMap from "@/components/SkillMap";
import WeaknessDetector from "@/components/WeaknessDetector";
import RewriteAssistant from "@/components/RewriteAssistant";
import ExplainabilityPanel from "@/components/ExplainabilityPanel";
import CareerInsights from "@/components/CareerInsights";
import ResumeHeatmap from "@/components/ResumeHeatmap";
import HiringManagerSimulator from "@/components/HiringManagerSimulator";
import InterviewPrep from "@/components/InterviewPrep";
import ThemeToggle from "@/components/ThemeToggle";

const Dashboard = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("analysisResult");
    if (stored) {
      setResult(JSON.parse(stored));
      setTimeout(() => setIsLoaded(true), 100);
    } else {
      navigate("/analyze");
    }
  }, [navigate]);

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-4 w-full max-w-6xl px-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton-shimmer h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="floating-orb w-[500px] h-[500px] bg-primary/10 -top-60 -right-60 animate-pulse-glow" />
      <div className="floating-orb w-[400px] h-[400px] bg-accent/10 bottom-0 -left-40 animate-pulse-glow" />
      <div className="floating-orb w-[300px] h-[300px] bg-primary/5 top-1/2 right-1/4 animate-float" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </motion.button>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-display font-bold text-sm">R</span>
            </div>
            <span className="font-display font-bold text-foreground">ResumeIQ</span>
          </motion.div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <motion.button
              onClick={() => navigate("/analyze")}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ x: 4 }}
            >
              <RotateCcw className="h-4 w-4" /> New Analysis
            </motion.button>
          </div>
        </div>

        <motion.h1
          className="text-3xl font-display font-bold text-foreground mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Analysis Results
        </motion.h1>
        <motion.p
          className="text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          AI-powered career intelligence for your target role
        </motion.p>

        {/* Dashboard Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
        >
          {/* Row 1: Score + Skill Radar */}
          <motion.div className="lg:col-span-1" variants={fadeUp}>
            <ScorePanel score={result.match_score} confidence={result.confidence_level} />
          </motion.div>

          <motion.div className="lg:col-span-2" variants={fadeUp}>
            <SkillMap matched={result.matched_skills} missing={result.missing_skills} />
          </motion.div>

          {/* Row 2: Hiring Manager Simulator */}
          <motion.div className="lg:col-span-3" variants={fadeUp}>
            <HiringManagerSimulator
              decision={result.hiring_manager_decision}
              feedback={result.hiring_manager_feedback}
              strengths={result.strength_areas}
              risks={result.risk_areas}
              alternativeRoles={result.alternative_roles_suggestions}
            />
          </motion.div>

          {/* Row 3: Resume Heatmap */}
          <motion.div className="lg:col-span-3" variants={fadeUp}>
            <ResumeHeatmap sections={result.resume_sections} />
          </motion.div>

          {/* Row 4: Explainability + Weakness */}
          <motion.div className="lg:col-span-2" variants={fadeUp}>
            <ExplainabilityPanel keywords={result.keyword_coverage} summary={result.career_fit_summary} />
          </motion.div>

          <motion.div className="lg:col-span-1" variants={fadeUp}>
            <WeaknessDetector suggestions={result.improvement_suggestions} />
          </motion.div>

          {/* Row 5: Rewrite Assistant */}
          <motion.div className="lg:col-span-3" variants={fadeUp}>
            <RewriteAssistant original={result.rewritten_bullet.original} improved={result.rewritten_bullet.improved} />
          </motion.div>

          {/* Row 6: Career Insights */}
          <motion.div className="lg:col-span-3" variants={fadeUp}>
            <CareerInsights
              strengths={result.strength_areas}
              risks={result.risk_areas}
              summary={result.career_fit_summary}
              hiringFeedback={result.hiring_manager_feedback}
            />
          </motion.div>

          {/* Row 7: Interview Preparation */}
          <motion.div className="lg:col-span-3" variants={fadeUp}>
            <InterviewPrep
              analysisSummary={result.career_fit_summary}
              matchedSkills={result.matched_skills.map(s => s.name)}
              missingSkills={result.missing_skills.map(s => s.name)}
              strengths={result.strength_areas}
              risks={result.risk_areas}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
