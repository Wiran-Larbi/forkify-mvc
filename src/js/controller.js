import * as model from './Model/model.js';
import recipeView from './View/recipe.js';
import searchView from './View/search.js';
import resultView from './View/result.js';
import paginationView from './View/pagination.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if ( module.hot ) {
//   module.hot.accept();
// }

      
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

const controlSearchResult = async function() {
  try {

    // * Getting the search query
    const query = searchView.getQuery();
    if(!query) return;

    // * Rendering Spinner While the search result data get loaded
    resultView.renderSpinner();

    // * Loading Search Results
    await model.loadSearch(query);

    // * Render Search Results
    resultView.render(model.getSearchResultsPage(1));

    // * Render the Pagination buttons
    paginationView.render(model.state.search);

    
  } catch (error) {
      resultView.renderError(error); 
  }
}

const controlPagination = function (page) {
   try {
    // * Render New Search Results
    resultView.render(model.getSearchResultsPage(page));

    // * Render the New Pagination buttons
    paginationView.render(model.state.search);

   } catch (error) {
    resultView.renderError(error); 
   }

    
}


const init = function() {
  // ? Publisher - Subscriber Pattern
  recipeView.renderSuccess();
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
}

init();