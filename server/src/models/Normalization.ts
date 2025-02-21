import mongoose from "mongoose";

const normalizationSchema = new mongoose.Schema({
  canonicalName: { type: String, required: true, unique: true },
  variations: { type: [String], default: [], index: true },
  phoneticKeys: { type: [String], default: [], index: true },
  category: { type: String, required: true },
});

export const Normalization = mongoose.model(
  "Normalization",
  normalizationSchema
);
