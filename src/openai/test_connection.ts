import OpenAI from "openai";
import dotenv from "dotenv";
import PromptTemplate from "../utils/PromptTemplate";
import generateResponseTemplate from "../utils/RecipeTemplate";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: PromptTemplate() + generateResponseTemplate()}],
    model: "gpt-3.5-turbo",
  });

  console.log(JSON.parse(JSON.stringify(completion.choices[0].message.content)));
}

main();