export default function generateResponseTemplate(): string {
    
    // Filter the available ingredients to include only those that are present in the recipe
    //const filteredIngredients = availableIngredients.filter(ingredient => ingredient !== mainIngredient);

    // Generate the recipe using the filtered ingredients
    const userPrompt = `When you generate a recipe, I want you to strictly follow this format in JSON - 
    {"RecipeName": "Enter the recipe name here",
    "Description": "Enter the recipe description here",
    "Ingredients": [{"IngredientName": "Enter the ingredient name here", "quantity": "Enter the numeric quantity here", "measurementUnit": "Enter the measurement unit here"}],
    "Instructions": ["Enter the instructions here"]}`;

    return userPrompt;
}