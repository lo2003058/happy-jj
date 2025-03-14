import {defineEventHandler, readBody} from 'h3';
import OpenAI from 'openai';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const aiApiEndpointModel = body.aiApiEndpointModel as string;
    const aiApiEndpoint = body.aiApiEndpoint as string;
    const aiApiSecret = body.aiApiSecret as string;
    const foodToAvoid = body.foods2Avoid as string[];
    const favoriteFood = body.favoriteFood as string[];
    const recipeType = body.recipeType as string;
    const recipeDifficulty = body.recipeDifficulty as string;
    const timeType = body.timeType as string;
    const locale = body.locale as string;

    const prompt = `
Generate a recipe specifically designed for women during menstruation that considers common nutritional needs and discomforts during this time. The recipe must:
- Exclude any ingredients listed in the \`foodToAvoid\` array.
- Incorporate ingredients from the \`favoriteFood\` array to personalize the recipe.
- Incorporate locale from the \`locale\` parameter.
- Belong to the specified recipe type: \`${recipeType}\` (choose one from: all, breakfast, lunch, dinner, snack, dessert, drink).
- Have a difficulty level of \`${recipeDifficulty}\` (only "easy", "medium", or "hard" are acceptable).
- Use \`${timeType}\` as how long to cook (valid units: all, short, medium, long in English).

Include the following data for clarity:
- recipeType: ${recipeType}
- foodToAvoid: ${foodToAvoid}
- favoriteFood: ${favoriteFood}
- locale: ${locale}
- recipeDifficulty: ${recipeDifficulty}
- timeType: ${timeType}

Please format the output using the following structure:

export interface Recipe {
    name: string,
    steps: string[],
    ingredients: Ingredients[],
    time: Time,
    difficulty: "easy" | "medium" | "hard",
    tags: string[]
}

export interface Ingredients {
    name: string,
    quantity: number,
    unit: string
}

export interface Time {
    time: number,
    unit: string
}

For example, if the selected recipe type is "lunch", ensure the recipe is suitable for a meal, avoids any ingredients in the \`foodToAvoid\` array, and incorporates items from the \`favoriteFood\` array.
Recipe title must be unique and appealing.
Time unit must be minutes, hours, days, weeks, months, or years.(In English)
Tags language depend on locale.
You only need to return a JSON object with the recipe details.
Remove any markdown formatting (e.g., \`\`\`json, \`\`\`); only return a pure JSON object.
`;

    // Initialize the OpenAI client with your API key.
    const client = new OpenAI({
        baseURL: aiApiEndpoint,
        apiKey: aiApiSecret,
    });

    // Call the chat completions endpoint.
    return await client.chat.completions.create({
        model: aiApiEndpointModel,
        messages: [{role: 'user', content: prompt}],
    });
});
