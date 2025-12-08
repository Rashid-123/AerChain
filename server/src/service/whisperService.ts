import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI ({
    apiKey: process.env.OPENAI_API_KEY!,
})

export const transcribeAudio = async (filePath: string) : Promise<string> => {
    // console.log("-----inside teh wishper service----")
    // console.log(filePath)
    const response = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1",
    })

    // console.log(response)

    return response.text;
}