import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const sampleJobs = [
  "Senior Frontend Engineer",
  "Full Stack Developer",
  "React Developer",
];

const JobDescriptionInput = ({ value, onChange }: JobDescriptionInputProps) => {
  const handleSample = () => {
    onChange(`Senior Frontend Engineer — TechCorp

We're looking for an experienced frontend engineer to join our product team. You'll be responsible for building and maintaining our web applications using React, TypeScript, and modern frontend tooling.

Requirements:
• 5+ years of experience in frontend development
• Expert-level React and TypeScript skills
• Experience with GraphQL and REST APIs
• Familiarity with AWS or cloud platforms
• Experience with CI/CD pipelines and Docker
• Strong understanding of responsive design and accessibility
• Agile methodology experience
• Excellent communication and collaboration skills

Nice to have:
• System design experience
• Node.js backend experience
• Open source contributions`);
  };

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground">Target Job Description</h3>
        <button
          onClick={handleSample}
          className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Use sample
        </button>
      </div>
      <Textarea
        placeholder="Paste the job description here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[200px] bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground resize-none focus:ring-primary/30"
      />
    </motion.div>
  );
};

export default JobDescriptionInput;
