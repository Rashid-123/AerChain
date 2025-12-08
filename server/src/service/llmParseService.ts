import OpenAI from "openai";
import { ParsedTaskFields } from "../types/taskTypes.js";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export const extractTaskFields = async (transcript: string): Promise<ParsedTaskFields> => {
    // console.log("inside the llm service ");
    
    const prompt = `
    From the following text, extract ONLY:
    - title
    - description
    - priority (low, medium, high)
    - dueDate (natural language)
    - status (default "To Do")

    IMPORTANT:
    - Return ONLY pure JSON
    - Do NOT use backticks
    - Do NOT wrap in markdown
    - Do NOT include \`\`\`json

    Text: "${transcript}"
    `;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });

    let content = completion.choices[0]?.message?.content || "";

    // console.log("----- Raw Model Output -----");
    // console.log(content);

    //  Remove unwanted markdown formatting
    // content = content.replace(/```json/g, "");
    // content = content.replace(/```/g, "");
    // content = content.trim();

    // console.log("----- Clean JSON Before Parse -----");
    // console.log(content);

    return JSON.parse(content);
};
