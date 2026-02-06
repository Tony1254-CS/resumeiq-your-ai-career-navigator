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

const Dashboard = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("analysisResult");
    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      navigate("/analyze");
    }
  }, [navigate]);

  if (!result) return null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="floating-orb w-[500px] h-[500px] bg-primary/10 -top-60 -right-60 animate-pulse-glow" />
      <div className="floating-orb w-[400px] h-[400px] bg-accent/10 bottom-0 -left-40 animate-pulse-glow" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
          <motion.button
            onClick={() => navigate("/analyze")}
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <RotateCcw className="h-4 w-4" /> New Analysis
          </motion.button>
        </div>

        <motion.h1
          className="text-3xl font-display font-bold text-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Analysis Results
        </motion.h1>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score - takes 1 col */}
          <div className="lg:col-span-1">
            <ScorePanel score={result.match_score} confidence={result.confidence_level} />
          </div>

          {/* Skills - takes 2 cols */}
          <div className="lg:col-span-2">
            <SkillMap matched={result.matched_skills} missing={result.missing_skills} />
          </div>

          {/* Explainability */}
          <div className="lg:col-span-2">
            <ExplainabilityPanel keywords={result.keyword_coverage} summary={result.career_fit_summary} />
          </div>

          {/* Weakness */}
          <div className="lg:col-span-1">
            <WeaknessDetector suggestions={result.improvement_suggestions} />
          </div>

          {/* Rewrite */}
          <div className="lg:col-span-3">
            <RewriteAssistant original={result.rewritten_bullet.original} improved={result.rewritten_bullet.improved} />
          </div>

          {/* Career Insights */}
          <div className="lg:col-span-3">
            <CareerInsights strengths={result.strength_areas} risks={result.risk_areas} summary={result.career_fit_summary} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
