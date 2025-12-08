import { Router } from "express";
import { handleVoiceProcessing } from "../controllers/voiceController.js";
import { upload } from "../utils/upload.js";

const router = Router();
console.log("inside the voice route")

router.post ("/parse", upload.single("audio"), handleVoiceProcessing);

export default router;
