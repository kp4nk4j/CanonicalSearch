export interface SearchResult {
  canonicalName: string;
  variations: string[];
  category: string;
}

const API_URL = "http://localhost:5000/api/search";

export const searchName = async (
  query: string
): Promise<SearchResult | null> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const result = await response.json();
    console.log("result : ", result);
    return result;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
