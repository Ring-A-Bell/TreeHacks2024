export default function generateRecipe(ingredients: [any]): string {
    const mainIngredient = 'chicken';
    const filteredIngredients = ['chicken', 'onion', 'garlic', 'tomato', 'salt', 'pepper'];
    
    // Filter the available ingredients to include only those that are present in the recipe
    //const filteredIngredients = availableIngredients.filter(ingredient => ingredient !== mainIngredient);

    // Generate the recipe using the filtered ingredients
    const userPrompt = `User Prompt:
    Generate a recipe using the provided list of ingredients. 
    The recipe should include only ingredients from the given list. 
    It's acceptable if the recipe doesn't utilize all the ingredients supplied.`;
    const heroIngredient = `Main Ingredient: ${mainIngredient}`;
    const items = `Available Ingredients:
    ${ingredients.map(ingredient => `- ${ingredient}`).join('\n  ')}`;

    console.log(userPrompt + '\n' + heroIngredient + '\n' + items);
    return userPrompt + '\n' + heroIngredient + '\n' + items;
}