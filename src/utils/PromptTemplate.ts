export default function generateRecipe(ingredients: [], mainIngredient: any): string {
    
    // Filter the available ingredients to include only those that are present in the recipe
    //const filteredIngredients = availableIngredients.filter(ingredient => ingredient !== mainIngredient);
    console.log('filteredIngredients: ', ingredients);
    // Generate the recipe using the filtered ingredients
    const userPrompt = `User Prompt:
    Generate a recipe using the provided list of ingredients. 
    The recipe should include only ingredients from the given list.
    There shouldn't be a single item in your recipe that isn't in the ingredient list I provided in the prompt.
    It's acceptable if the recipe doesn't utilize all the ingredients supplied.`;
    const heroIngredient = `Main Ingredient: ${mainIngredient}`;
    const items = `Available Ingredients:
    ${ingredients.map(ingredient => `- ${ingredient}`).join('\n  ')}`;

    console.log(userPrompt + '\n' + heroIngredient + '\n' + items);
    return userPrompt + '\n' + heroIngredient + '\n' + items;
}