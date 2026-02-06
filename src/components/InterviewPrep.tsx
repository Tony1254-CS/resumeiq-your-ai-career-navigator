import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Lightbulb, ChevronDown, ChevronUp, Loader2, Sparkles, Target, Users, AlertTriangle, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface InterviewQuestion {
  category: string;
  question: string;
  why_asked: string;
  coaching_tip: string;
  difficulty: string;
}

interface InterviewPrepProps {
  analysisSummary: string;
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  risks: string[];
}

const categoryConfig: Record<string, { icon: typeof Brain; color: string }> = {
  Technical: { icon: Brain, color: "text-primary" },
  Behavioral: { icon: Users, color: "text-accent-foreground" },
  "Gap-probing": { icon: AlertTriangle, color: "text-destructive" },
  "Culture Fit": { icon: Target, color: "text-primary" },
  Scenario: { icon: Sparkles, color: "text-primary" },
};

const difficultyColor: Record<string, string> = {
  Easy: "bg-success/15 text-success border-success/20",
  Medium: "bg-warning/15 text-warning border-warning/20",
  Hard: "bg-destructive/15 text-destructive border-destructive/20",
};

const InterviewPrep = ({ analysisSummary, matchedSkills, missingSkills, strengths, risks }: InterviewPrepProps) => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const summary = `Career Fit: ${analysisSummary}\n\nMatched Skills: ${matchedSkills.join(", ")}\nMissing Skills: ${missingSkills.join(", ")}\nStrengths: ${strengths.join(", ")}\nRisks: ${risks.join(", ")}`;

      const { data, error } = await supabase.functions.invoke("generate-interview-questions", {
        body: { analysis_summary: summary },
      });

      if (error) {
        console.error("Interview prep error:", error);
        toast.error("Failed to generate questions. Please try again.");
        setIsLoading(false);
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        setIsLoading(false);
        return;
      }

      setQuestions(data.questions || []);
    } catch (err) {
      console.error("Interview prep error:", err);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [...new Set(questions.map((q) => q.category))];
  const filtered = activeCategory ? questions.filter((q) => q.category === activeCategory) : questions;

  return (
    <motion.div
      className="glass-card-hover p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground text-lg">Interview Preparation</h3>
            <p className="text-xs text-muted-foreground">AI-generated questions tailored to your profile</p>
          </div>
        </div>

        {questions.length === 0 && (
          <Button
            onClick={handleGenerate}
            disabled={isLoading}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--glow-primary))]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Questions
              </>
            )}
          </Button>
        )}
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
            <Brain className="h-5 w-5 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">Crafting tailored interview questions…</p>
        </div>
      )}

      {!isLoading && questions.length > 0 && (
        <>
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-5">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                !activeCategory
                  ? "bg-primary/15 text-primary border-primary/30"
                  : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/20"
              }`}
            >
              All ({questions.length})
            </button>
            {categories.map((cat) => {
              const config = categoryConfig[cat];
              const Icon = config?.icon || Brain;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    activeCategory === cat
                      ? "bg-primary/15 text-primary border-primary/30"
                      : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/20"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {cat} ({questions.filter((q) => q.category === cat).length})
                </button>
              );
            })}
          </div>

          {/* Questions list */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((q, i) => {
                const isExpanded = expandedIndex === i;
                const config = categoryConfig[q.category];
                const Icon = config?.icon || Brain;

                return (
                  <motion.div
                    key={q.question}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    className="glass-card p-4 cursor-pointer hover:border-primary/20 transition-colors"
                    onClick={() => setExpandedIndex(isExpanded ? null : i)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${config?.color || "text-primary"}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground leading-relaxed">{q.question}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                              {q.category}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${difficultyColor[q.difficulty] || ""}`}>
                              {q.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      )}
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-3 border-t border-border space-y-3">
                            <div className="flex items-start gap-2">
                              <Target className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                              <div>
                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1">Why this is asked</p>
                                <p className="text-xs text-muted-foreground leading-relaxed">{q.why_asked}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Lightbulb className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                              <div>
                                <p className="text-[10px] uppercase tracking-wider text-primary font-medium mb-1">Coaching Tip</p>
                                <p className="text-xs text-foreground leading-relaxed">{q.coaching_tip}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Regenerate */}
          <div className="mt-5 flex justify-center">
            <Button
              onClick={handleGenerate}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              <Sparkles className="mr-1.5 h-3 w-3" />
              Regenerate Questions
            </Button>
          </div>
        </>
      )}

      {!isLoading && questions.length === 0 && (
        <div className="text-center py-8">
          <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            Click "Generate Questions" to get AI-tailored interview questions based on your analysis.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default InterviewPrep;
