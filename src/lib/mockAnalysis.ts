import { AnalysisResult } from "../types/analysis";

export const mockAnalysisResult: AnalysisResult = {
  match_score: 78,
  confidence_level: "High",
  matched_skills: [
    { name: "React", relevance: 95 },
    { name: "TypeScript", relevance: 90 },
    { name: "REST APIs", relevance: 85 },
    { name: "Git", relevance: 80 },
    { name: "Agile", relevance: 75 },
    { name: "CSS/Tailwind", relevance: 88 },
    { name: "Node.js", relevance: 70 },
  ],
  missing_skills: [
    { name: "GraphQL", importance: "High" },
    { name: "AWS/Cloud", importance: "High" },
    { name: "CI/CD Pipelines", importance: "Medium" },
    { name: "Docker", importance: "Medium" },
    { name: "System Design", importance: "Low" },
  ],
  keyword_coverage: [
    { keyword: "frontend", found: true },
    { keyword: "react", found: true },
    { keyword: "typescript", found: true },
    { keyword: "graphql", found: false },
    { keyword: "cloud infrastructure", found: false },
    { keyword: "agile methodology", found: true },
    { keyword: "CI/CD", found: false },
    { keyword: "responsive design", found: true },
  ],
  improvement_suggestions: [
    "Add quantifiable metrics to your project achievements (e.g., 'improved load time by 40%')",
    "Include cloud platform experience — even personal projects count",
    "Mention GraphQL if you have any exposure; it's a key requirement",
    "Add a 'Technical Skills' section with proficiency levels",
    "Include leadership or mentoring experience to stand out",
  ],
  rewritten_bullet: {
    original: "Worked on frontend development using React and built various features for the web application.",
    improved: "Spearheaded frontend architecture using React & TypeScript, delivering 12+ production features that improved user engagement by 35% and reduced page load times by 2.1s across a 50K+ MAU platform.",
  },
  strength_areas: [
    "Strong frontend technology stack alignment",
    "Demonstrated experience with modern JavaScript frameworks",
    "Good foundation in responsive design principles",
    "Solid version control and collaboration skills",
  ],
  risk_areas: [
    "No cloud infrastructure experience mentioned",
    "Missing backend/full-stack capabilities the role requires",
    "No evidence of CI/CD pipeline management",
    "Limited mention of testing methodologies",
  ],
  career_fit_summary: "You're a strong frontend candidate with 78% alignment to this role. Your React and TypeScript skills are excellent matches. The main gaps are in cloud infrastructure and DevOps practices. Adding even basic AWS or Docker experience would significantly boost your profile. Consider highlighting any backend work or API design experience more prominently.",
  hiring_manager_feedback: "This candidate shows solid frontend fundamentals and would be productive quickly on our React codebase. However, I'd want to see some cloud experience before extending an offer for this senior role. Worth a technical screen to assess system design thinking.",
};

export function simulateAnalysis(): Promise<AnalysisResult> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAnalysisResult), 3000);
  });
}
