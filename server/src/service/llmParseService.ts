import OpenAI from "openai";
import { ParsedTaskFields } from "../types/taskTypes.js";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export const extractTaskFields = async (transcript: string): Promise<ParsedTaskFields> => {
    // console.log("inside the llm service ");


    const prompt = `
You are a task extraction engine for a voice-enabled task manager. 
Your job is to analyze the user's spoken input and extract structured task fields.
The language of description and tittle should look like how a user add ToDos

From the following text, identify and extract ONLY these fields:
- title: the main action or task
- description: additional details or context (if any)
- priority: one of (low, medium, high). If not mentioned, return medium
- dueDate: natural language due date phrase , always add next if it is a day name (e.g., "tomorrow at 5 pm", "next Monday")
- status: one fo (To Do , In Progress , Done ). If not mentioned , return "To Do"

REQUIREMENTS:
- Output MUST be valid JSON only
- Do NOT include backticks
- Do NOT include markdown
- Do NOT include explanations
- Do NOT include \`\`\`json or any wrapping text
- JSON must be the ONLY content in the response

Here is the user text to analyze:
"${transcript}"
`;


    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });

    let content = completion.choices[0]?.message?.content || "";

   

    return JSON.parse(content);
};
