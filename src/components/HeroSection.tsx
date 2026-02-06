import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Brain, Target, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Brain, title: "AI-Powered Analysis", desc: "Deep semantic matching between your resume and target role" },
  { icon: Target, title: "Skill Gap Detection", desc: "Instantly identify missing skills and keywords" },
  { icon: Zap, title: "Smart Rewriting", desc: "AI-generated bullet points that get noticed" },
  { icon: BarChart3, title: "Career Intelligence", desc: "Hiring manager perspective and actionable insights" },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background orbs */}
      <div className="floating-orb w-[500px] h-[500px] bg-primary/20 -top-40 -right-40 animate-pulse-glow" />
      <div className="floating-orb w-[400px] h-[400px] bg-accent/20 -bottom-32 -left-32 animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="floating-orb w-[300px] h-[300px] bg-primary/10 top-1/2 left-1/2 animate-float" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            AI-Powered Resume Intelligence
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Land Your Dream Role{" "}
          <span className="gradient-text">with AI</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Upload your resume, paste the job description, and get instant AI-powered 
          analysis with actionable insights to maximize your chances.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 font-display font-semibold shadow-[0_0_30px_hsl(var(--glow-primary))]"
            onClick={() => navigate("/analyze")}
          >
            Analyze My Resume
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:bg-secondary text-base px-8 py-6 font-display"
          >
            See How It Works
          </Button>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="glass-card-hover p-6 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
            >
              <f.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
