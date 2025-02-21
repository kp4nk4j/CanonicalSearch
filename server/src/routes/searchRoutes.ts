import express from "express";
import { Request, Response } from "express";
import { searchHandler } from "../controllers/searchController";

export const router = express.Router();

router.post("/search", searchHandler);
