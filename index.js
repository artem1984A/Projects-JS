'use strict';

const cakeRecipes = require("./cake-recipes.json");

// Your functions here

//console.log(cakeRecipes[3]);

//Part 1

//Function 1
const uniqueAuthors = (cakeRecipes) => {
  const authors = [];
  cakeRecipes.forEach((recipe) => {
    if(!authors.includes(recipe.Author)) {
      authors.push(recipe.Author);
    }
    return authors;
  });
  return authors;
}
//Pure function

//Function 2
const logRecipeNames = (recipes) => {
  let hasValidNames = false;

  recipes.forEach(recipe => {
    const { Name } = recipe; // Destructure the Name property from the recipe object
    if (Name) {
      console.log(Name);
      hasValidNames = true;
    }
  });

  // If no valid names were found, log a message
  if (!hasValidNames) {
    console.log("There are no recipes found");
  }
  
}
//Impure function

//Function3
const getRecipesByAuthor = (recipes, author) => {
  return recipes.filter(recipe => recipe.Author === author);
};
//Pure function


//Function 4
const getRecipeByName = (recipes, name) => {
  return recipes.find(recipe => recipe.Name.includes(name)) || null;
};
//Pure function


//Function 5
const getRecipesByIngredient = (recipes, ingredient) => {
  return recipes.filter(recipe => 
    recipe.Ingredients.some(ing => ing.includes(ingredient))
  );
}
//Pure function


//Function 6
const printRecipeNames = (recipes) => {
  if (recipes.length === 0) {
    console.log('No recipes found');
  } else {
    recipes.forEach(recipe => {
      console.log(recipe.Name);
    });
  }
};
//Impure function

//Function 7
const getAllIngredients = (recipes) => {
  return recipes.reduce((allIngredients, recipe) => {
    return allIngredients.concat(recipe.Ingredients);
  }, []);
  
};
//Pure function


//console.log(getRecipesByIngredient(cakeRecipes, "140g caster sugar"));
//console.log(getRecipesByAuthor(cakeRecipes, "Mary Cadogan"))
//console.log(logRecipeNames(cakeRecipes[0]));
//console.log(Array.isArray(getAllIngredients(getRecipesByAuthor(cakeRecipes, "Mary Cadogan"))));
//console.log(uniqueAuthors(cakeRecipes));










// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("6. Log All Recipe Names");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-6) or 0 to exit: ");
  return parseInt(choice);
}



let savedRecipes = [];
let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      const authors = uniqueAuthors(cakeRecipes);
      console.log("All Authors:");
      authors.forEach(author => console.log(author));
      break;

    case 2:
      const authorName = prompt("Enter author name: ");
      const authorRecipes = getRecipesByAuthor(cakeRecipes, authorName);
      if (authorRecipes.length > 0) {
        console.log(`Recipes by ${authorName}:`);
        printRecipeNames(authorRecipes);
      } else {
        console.log(`No recipes found for author ${authorName}.`);
      }
      break;

    case 3:
      const ingredientName = prompt("Enter ingredient: ");
      const ingredientRecipes = getRecipesByIngredient(cakeRecipes, ingredientName);
      if (ingredientRecipes.length > 0) {
        console.log(`Recipes containing ${ingredientName}:`);
        printRecipeNames(ingredientRecipes);
      } else {
        console.log(`No recipes found with ingredient ${ingredientName}.`);
      }
      break;

    case 4:
      const recipeName = prompt("Enter recipe name (or part of it): ");
      const foundRecipe = getRecipeByName(cakeRecipes, recipeName);
      if (foundRecipe) {
        console.log(`Recipe: ${foundRecipe.Name}`);
        console.log(`URL: ${foundRecipe.url}`);
        console.log(`Description: ${foundRecipe.Description}`);
        console.log("Ingredients:");
        foundRecipe.Ingredients.forEach(ingredient => console.log(ingredient));
        console.log("Method:");
        foundRecipe.Method.forEach(step => console.log(step));
        const saveIngredients = prompt("Do you want to save this recipe? (yes/no): ");
        if (saveIngredients.toLowerCase() === 'yes') {
          savedRecipes.push(foundRecipe);
          console.log("Recipe saved.");
        }
      } else {
        console.log(`No recipe found with the name ${recipeName}.`);
      }
      break;

    case 5:
      if (savedRecipes.length > 0) {
        console.log("All ingredients from saved recipes:");
        const allIngredients = getAllIngredients(savedRecipes);
        allIngredients.forEach(ingredient => console.log(ingredient));
      } else {
        console.log("No ingredients saved yet.");
      }
      break;

/*This part (number 6) was be adding by me because of your requirements Function to Log Recipe Names for this project. May be i am misunderstood a description of requirements.
  */    
    case 6:
      console.log("Logging all recipe names:");
      logRecipeNames(cakeRecipes);
      break;

    case 0:
      console.log("Exiting...");
      break;

    default:
      console.log("Invalid input. Please enter a number between 0 and 6.");
  }
} while (choice !== 0);
