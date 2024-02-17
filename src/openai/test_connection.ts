import OpenAI from "openai";
import dotenv from "dotenv";
import Configuration from "openai";
import OpenAIApi from "openai";

dotenv.config();

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();