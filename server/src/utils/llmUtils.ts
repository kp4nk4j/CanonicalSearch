import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export interface LLMResponse {
  canonicals: string | null;
  category: string | null;
}

export const getLLMMatchedName = async (
  query: string
): Promise<LLMResponse | null> => {
  try {
    const prompt = `You are a name-matching AI. The user searched for "${query}". 
    You must suggest the closest matching canonical names from a database of family names, yeshivas, or chassiduses.
    e.g. :- when I search "Pankaj" you provide: {"canonicals": "Parkaj,Parkaji,Pankaja,Pankajan,Pankaji,Pankajjan", "category": "family"}
    Don't include extra explanations, just return a valid JSON response.`;

    const response = await axios.post(
      "https://api.deepinfra.com/v1/openai/chat/completions",
      {
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEEPINFRA_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Raw Response:", response.data.choices[0]?.message?.content);

    // Extract JSON part using regex
    const jsonMatch =
      response.data.choices[0]?.message?.content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);

    const can1 = parsedResponse.canonicals;
    const cat1 = parsedResponse.category;

    const res: LLMResponse = {
      canonicals: can1,
      category: cat1,
    };

    return res;
  } catch (error) {
    console.error("LLM Matching Error:", error);
    return null;
  }
};
