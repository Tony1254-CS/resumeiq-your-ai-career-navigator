import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import AnalysisLoader from "@/components/AnalysisLoader";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Analyze = () => {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const canAnalyze = resumeText.trim().length > 0 && jobDesc.trim().length > 0;

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-resume", {
        body: { resume_text: resumeText, job_description: jobDesc },
      });

      if (error) {
        console.error("Analysis error:", error);
        toast.error("Analysis failed. Please try again.");
        setIsAnalyzing(false);
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        setIsAnalyzing(false);
        return;
      }

      sessionStorage.setItem("analysisResult", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      console.error("Analysis error:", err);
      toast.error("Something went wrong. Please try again.");
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative">
        <div className="floating-orb w-[400px] h-[400px] bg-primary/15 top-20 right-20 animate-pulse-glow" />
        <AnalysisLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="floating-orb w-[400px] h-[400px] bg-primary/10 -top-40 -right-40 animate-pulse-glow" />
      <div className="floating-orb w-[300px] h-[300px] bg-accent/10 -bottom-20 -left-20 animate-pulse-glow" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        <motion.button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
            Analyze Your Resume
          </h1>
          <p className="text-muted-foreground">
            Upload your resume and paste the target job description to get AI-powered insights.
          </p>
        </motion.div>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">1. Your Resume</label>
            <FileUpload onFileContent={setResumeText} />
            {!resumeText && (
              <motion.div className="mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <p className="text-xs text-muted-foreground mb-2">Or paste your resume text:</p>
                <textarea
                  className="w-full h-32 rounded-lg bg-secondary/50 border border-border p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary/30"
                  placeholder="Paste resume content here..."
                  onChange={(e) => setResumeText(e.target.value)}
                />
              </motion.div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">2. Target Job Description</label>
            <JobDescriptionInput value={jobDesc} onChange={setJobDesc} />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              disabled={!canAnalyze}
              onClick={handleAnalyze}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold py-6 text-base shadow-[0_0_30px_hsl(var(--glow-primary))] disabled:opacity-30 disabled:shadow-none"
            >
              <Brain className="mr-2 h-5 w-5" />
              Analyze with AI
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
