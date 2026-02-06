export interface SkillMatch {
  name: string;
  relevance: number;
}

export interface MissingSkill {
  name: string;
  importance: "High" | "Medium" | "Low";
}

export interface KeywordCoverage {
  keyword: string;
  found: boolean;
}

export interface ResumeSection {
  text: string;
  rating: "strong" | "moderate" | "weak";
  reason: string;
}

export interface AnalysisResult {
  match_score: number;
  confidence_level: string;
  matched_skills: SkillMatch[];
  missing_skills: MissingSkill[];
  keyword_coverage: KeywordCoverage[];
  improvement_suggestions: string[];
  rewritten_bullet: {
    original: string;
    improved: string;
  };
  strength_areas: string[];
  risk_areas: string[];
  career_fit_summary: string;
  hiring_manager_feedback: string;
  hiring_manager_decision: "Yes" | "Maybe" | "No";
  alternative_roles_suggestions: string[];
  resume_sections: ResumeSection[];
}
