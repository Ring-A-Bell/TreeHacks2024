import OpenAI from "openai";
import dotenv from "dotenv";
import PromptTemplate from "../utils/PromptTemplate";
import generateResponseTemplate from "../utils/RecipeTemplate";
dotenv.config();

export default class OpenAIConnection {
  async main(ingredients: any, mainIngredient: any) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: PromptTemplate(ingredients, mainIngredient) + generateResponseTemplate() },
      ],
      model: "gpt-3.5-turbo",
    });

    return (JSON.parse(JSON.stringify(completion.choices[0].message.content)));
  }
}

// Example usage:
// const connection = new OpenAIConnection("your-api-key");
// connection.main(param1, param2);
