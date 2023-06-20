import * as model from './Model/model.js';
import recipeView from './View/recipe.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
      
const controlRecipes = async function() {
    try {
    
    // * Getting the recipe hash
    const recipe_id = window.location.hash.slice(1);
    if(!recipe_id.length) return;

    // * Rendering Spinner While the recipe data get loaded
    recipeView.renderSpinner();

    // * Loading recipe
    await model.loadRecipe(recipe_id);

    const recipe = model.state.recipe;
    
    // * Rendering the Recipe after data loaded
    recipeView.render(recipe);

    
  } catch (error) {
      console.log(error);
  }
}

// ? Listening to hash changing
const events = ["hashchange","load"];
events.forEach(e => window.addEventListener(e,controlRecipes));