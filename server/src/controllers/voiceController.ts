import { Request, Response } from "express";
import fs from "fs";
import { transcribeAudio } from "../service/whisperService.js";
import { extractTaskFields } from "../service/llmParseService.js";
import { parseDueDate } from "../service/dateService.js";
import { FinalTaskResponse } from "../types/taskTypes.js";

export const handleVoiceProcessing = async (req: Request, res: Response) => {
    try {
        console.log("----------- controller ")
        if (!req.file) {
            return res.status(400).json({ error: "Audio file is required" });
        }

        const audioFilePath = req.file.path;

        console.log(`--- Audio file path ---- : ${audioFilePath}`)

        // convert audio --> transcript
        const transcript = await transcribeAudio(audioFilePath);
        
        // delete the file just after wishper reponse
        fs.unlink(audioFilePath, () => { });

        console.log("after wisper")

        // Parse task info from transcript usin LLM 
        const parsed = await extractTaskFields(transcript);

        console.log("after parsing")
        console.log(parsed)

        // Parse human date --> ISO date

        const formattedDate = parseDueDate(parsed.dueDate ?? "");

        console.log("final")
        console.log(formattedDate);

        const response: FinalTaskResponse = {
            transcript,
            ...parsed,
            dueDate: formattedDate,
        }

        return res.json(response);

    } catch (error) {

        if (req.file) {
            fs.unlink(req.file.path, () => { });
        }

        console.error("Voice processing error:", error);
        return res.status(500).json({ error: "Failed to process audio" });

    }
}