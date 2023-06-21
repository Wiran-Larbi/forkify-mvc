import * as model from './Model/model.js';
import recipe from './View/recipe.js';
import recipeView from './View/recipe.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

      
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
      recipeView.renderError();
  }
}

const init = function() {
  // ? Publisher - Subscriber Pattern
  recipeView.renderSuccess();
  recipeView.addHandlerRender(controlRecipes);
}

init();