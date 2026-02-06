import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an expert career analyst AI. Given a resume and a job description, analyze how well the candidate matches the role.

You MUST respond by calling the "analyze_resume" function with structured data. Do not output plain text.

Be specific, actionable, and honest in your analysis. Use the actual content from the resume and job description to make your assessment. Provide professional, non-generic feedback that references specific details from the resume.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { resume_text, job_description } = await req.json();

    if (!resume_text || !job_description) {
      return new Response(
        JSON.stringify({ error: "Both resume_text and job_description are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userPrompt = `## Resume:\n${resume_text}\n\n## Job Description:\n${job_description}\n\nAnalyze this resume against the job description thoroughly.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_resume",
              description: "Return structured resume analysis results",
              parameters: {
                type: "object",
                properties: {
                  match_score: { type: "number", description: "Overall match score 0-100" },
                  confidence_level: { type: "string", enum: ["High", "Medium", "Low"] },
                  matched_skills: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        relevance: { type: "number", description: "0-100 relevance score" },
                      },
                      required: ["name", "relevance"],
                      additionalProperties: false,
                    },
                  },
                  missing_skills: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        importance: { type: "string", enum: ["High", "Medium", "Low"] },
                      },
                      required: ["name", "importance"],
                      additionalProperties: false,
                    },
                  },
                  keyword_coverage: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keyword: { type: "string" },
                        found: { type: "boolean" },
                      },
                      required: ["keyword", "found"],
                      additionalProperties: false,
                    },
                  },
                  improvement_suggestions: { type: "array", items: { type: "string" } },
                  rewritten_bullet: {
                    type: "object",
                    properties: {
                      original: { type: "string" },
                      improved: { type: "string" },
                    },
                    required: ["original", "improved"],
                    additionalProperties: false,
                  },
                  strength_areas: { type: "array", items: { type: "string" } },
                  risk_areas: { type: "array", items: { type: "string" } },
                  career_fit_summary: { type: "string", description: "2-3 sentence summary of overall fit" },
                  hiring_manager_feedback: { type: "string", description: "Direct, candid feedback as if from a hiring manager reviewing this application. 2-3 sentences." },
                },
                required: [
                  "match_score", "confidence_level", "matched_skills", "missing_skills",
                  "keyword_coverage", "improvement_suggestions", "rewritten_bullet",
                  "strength_areas", "risk_areas", "career_fit_summary", "hiring_manager_feedback",
                ],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "analyze_resume" } },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "AI analysis failed. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log("AI response received:", JSON.stringify(data).substring(0, 200));

    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      console.error("No tool call in response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "AI did not return structured analysis. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const analysisResult = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("analyze-resume error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
