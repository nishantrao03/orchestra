import { callGemini } from "../gemini-call-helper.js";
import dotenv from "dotenv";

dotenv.config();

async function testCallGemini() {
    console.log("Running Gemini helper test...");

    const messages = [
        { 
            role: "system", 
            content: "You are a helpful assistant. You must respond strictly in JSON format." 
        },
        {
            role: "user",
            content: "How many Player of the Series awards has Virat Kohli won in ODI bilateral series?"
        }
    ];

    const responseFormat = {
        type: "json_schema",
        json_schema: {
            name: "player_statistics",
            schema: {
                type: "object",
                properties: {
                    player: { type: "string" },
                    format: { type: "string" },
                    playerOfTheSeriesAwards: { type: "number" }
                },
                required: ["player", "format", "playerOfTheSeriesAwards"]
            }
        }
    };

    const response = await callGemini(messages, null, false, responseFormat);

    if (!response) {
        console.error("callGemini returned null");
        return;
    }

    if (!response.choices || response.choices.length === 0) {
        console.error("Response has no choices");
        return;
    }

    console.log("Gemini responded successfully\n");
    console.log("Response content:");
    console.log(response.choices[0].message.content);
}

testCallGemini();