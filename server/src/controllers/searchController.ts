import { Request, Response } from "express";
import { Normalization } from "../models/Normalization";
import { generatePhoneticKeys } from "../utils/phoneticUtils";
import { getLLMMatchedName, LLMResponse } from "../utils/llmUtils";

export const searchHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("Received request body: ", req.body);

  try {
    const { query } = req.body;

    if (!query || typeof query !== "string") {
      res.status(400).json({ message: "Invalid search query!" });
      return;
    }

    const phoneticKeys = generatePhoneticKeys(query);
    let record = await Normalization.findOne({
      $or: [
        { canonicalName: query },
        { variations: query },
        { phoneticKeys: { $in: phoneticKeys } },
      ],
    });

    if (record) {
      res.json(record);
      return;
    }

    const llmMatchedName: LLMResponse | null = await getLLMMatchedName(query);

    if (llmMatchedName) {
      console.log(`OpenAI matched: ${llmMatchedName.canonicals}`);
      record = await Normalization.findOne({
        canonicalName: llmMatchedName.canonicals,
      });

      if (record) {
        record.variations.push(query);
        record.phoneticKeys.push(...phoneticKeys);
        await record.save();
        res.json(record);
        return;
      }
    }

    // 🔥 If LLM also has no match, create a new record
    record = new Normalization({
      canonicalName: llmMatchedName?.canonicals || query,
      variations: [query],
      phoneticKeys: phoneticKeys,
      category: llmMatchedName?.category || "unknown",
    });

    await record.save();
    res.json(record);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
