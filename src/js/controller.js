import * as model from './Model/model.js';
import { FORM_CLOSE_SEC } from './config.js';
import { UpdateURLId } from './handler.js';
import recipeView from './View/recipe.js';
import searchView from './View/search.js';
import resultView from './View/result.js';
import bookmarkView from './View/bookmark.js';
import paginationView from './View/pagination.js';
import recipeFormView from './View/recipeForm.js';

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

     // * Rendering the Bookmarked Recipes
     bookmarkView.render(model.state.bookmarks);

    // * Rendering Spinner While the recipe data get loaded
    recipeView.renderSpinner();

    // * Updating the Results View to mark selected search result
    if(model.state.search.page){
      resultView.update(model.getSearchResultsPage(model.state.search.page));
    }

    // * Loading recipe
    await model.loadRecipe(recipe_id);

    const recipe = model.state.recipe;
    
    // * Rendering the Recipe after data loaded
    recipeView.render(recipe);

   
    
  } catch (error) {
      recipeView.renderError(error.message);
      console.error(error);
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
      console.error(error);
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
    console.error(error);
   }
}

const controlServings = function(newServings) {
    try {
      // * Update the recipe servings (in state)
      model.updateServings(newServings);

      // * Update the recipe view
      recipeView.update(model.state.recipe);


      
    } catch (error) {
      recipeView.renderError(error);
      console.error(error);
    }
}

const controlBookmark = function () {
  try {
    if(!model.state.recipe.isBookmarked){
      // * Adding the bookmarked recipe to the state
      model.addBookmark(model.state.recipe);
    }else {
      // * Deleting the bookmarked recipe from the state
      model.deleteBookmark(model.state.recipe.id);
    }
    // * Updating the View 
    recipeView.update(model.state.recipe); 
  } catch (error) {
    console.error(error);
  }
}

const controlAddedBookmarks = function() {
    bookmarkView.render(model.state.bookmarks);
}

const controlRecipeFormData = async function(RecipeData) {
  try {

    // * Rendering the Spinner
    recipeFormView.renderSpinner();

    // * Uploading Recipe Data to API
    await model.uploadRecipe(RecipeData);

    // * Rendering Saved Recipe Data
    recipeView.render(model.state.recipe); 

    // * Closing the form Modal Window
    setTimeout(function () {
      recipeFormView._toggleForm();
    },FORM_CLOSE_SEC * 1000);

    // * Displaying the Success Message
    recipeFormView.renderSuccess();

    // * Rerender bookmarks View
    bookmarkView.render(model.state.bookmarks);

    // * Updating the ID of the URL
    UpdateURLId(model.state.recipe.id);
        
  } catch (error) {
    console.error('💭' + error);
    recipeFormView.renderError(error.message);
  }

}



const init = function() {
  // ? Publisher - Subscriber Pattern
  // * Bookmark View Handler
  bookmarkView.addHandlerRender(controlAddedBookmarks);

  // * Recipe View Handlers
  recipeView.renderSuccess();
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);

  // * Search Result Handlers
  searchView.addHandlerSearch(controlSearchResult);
  
  // * Pagination Handlers
  paginationView.addHandlerClick(controlPagination);

  // * Recipe Form Handlers
  recipeFormView._addHandlerRecipeUpload(controlRecipeFormData); 
}

init();