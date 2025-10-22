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

    const prompt = `Generate a menstruation-friendly recipe with the following requirements:

RECIPE CONSTRAINTS:
- Type: ${recipeType === 'all' ? 'any meal type' : recipeType}
- Difficulty: ${recipeDifficulty}
- Preparation time: ${timeType === 'all' ? 'any duration' : timeType}
- Language/Locale: ${locale}

DIETARY REQUIREMENTS:
- MUST AVOID these ingredients: ${foodToAvoid.length > 0 ? foodToAvoid.join(', ') : 'none specified'}
- SHOULD INCLUDE these preferred ingredients: ${favoriteFood.length > 0 ? favoriteFood.join(', ') : 'none specified'}

NUTRITIONAL FOCUS:
Focus on ingredients that help with menstruation symptoms:
- Iron-rich foods (to combat fatigue and replenish blood loss)
- Magnesium sources (to reduce cramps and mood swings)
- Omega-3 fatty acids (anti-inflammatory properties)
- Complex carbohydrates (stable energy)
- Calcium sources (muscle relaxation)
- Foods rich in B vitamins (energy and mood support)

OUTPUT REQUIREMENTS:
- Recipe name should be appealing and descriptive
- Steps should be clear and concise (do NOT include step numbers, they will be added automatically)
- Ingredients must specify quantity and unit
- Time unit must be one of: minutes, hours, days (in English)
- Tags should be in the locale language (${locale})
- Tags should include relevant categories (e.g., iron-rich, anti-inflammatory, comfort food)`;

    // Initialize the OpenAI client with your API key.
    const client = new OpenAI({
        baseURL: aiApiEndpoint,
        apiKey: aiApiSecret,
    });

    // Call the chat completions endpoint with structured output.
    return client.chat.completions.create({
        model: aiApiEndpointModel,
        messages: [{role: 'user', content: prompt}],
        response_format: {
            type: 'json_schema',
            json_schema: {
                name: 'recipe_response',
                strict: true,
                schema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Unique and appealing recipe name'
                        },
                        steps: {
                            type: 'array',
                            items: {type: 'string'},
                            description: 'Cooking steps in order'
                        },
                        ingredients: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {type: 'string'},
                                    quantity: {type: 'number'},
                                    unit: {type: 'string'}
                                },
                                required: ['name', 'quantity', 'unit'],
                                additionalProperties: false
                            }
                        },
                        time: {
                            type: 'object',
                            properties: {
                                time: {type: 'number'},
                                unit: {
                                    type: 'string',
                                    enum: ['minutes', 'hours', 'days']
                                }
                            },
                            required: ['time', 'unit'],
                            additionalProperties: false
                        },
                        difficulty: {
                            type: 'string',
                            enum: ['easy', 'medium', 'hard']
                        },
                        tags: {
                            type: 'array',
                            items: {type: 'string'},
                            description: 'Tags in the specified locale language'
                        }
                    },
                    required: ['name', 'steps', 'ingredients', 'time', 'difficulty', 'tags'],
                    additionalProperties: false
                }
            }
        }
    });
});
