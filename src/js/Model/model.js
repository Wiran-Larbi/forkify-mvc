import { getJSON } from "../handler";
import {RecipeDTO, RecipeSearchDTO} from "./recipe.js";
import { RECIPE_PAGE,API_URL } from "../config";
import bookmark from "../View/bookmark";


export const state = {
    recipe: {},
    search: {},
    bookmarks: []
}

export const loadRecipe = async function(recipeId) {

    try {
       
    const recipeJSON = await getJSON(`${API_URL}/${recipeId}`);
    // * Loading the recipe
    const {id,title,publisher,source_url,image_url,servings,cooking_time,ingredients} = recipeJSON.data.recipe;

    let recipe = new RecipeDTO(id,title,publisher,image_url,source_url,servings,cooking_time,ingredients);

    // ? Mutating the state for later use of data
    state.recipe = recipe;

    // ? Checking if the loaded recipe already in the bookmarks
    if(state.bookmarks?.some(bookmark => bookmark.id == recipe.id))
        state.recipe.bookmark();
    else
        state.recipe.unbookmark();

    } catch (error) {
        throw error;
    }
}

export const loadSearch = async function(query) {

    try {
        
        const searchJSON = await getJSON(`${API_URL}?search=${query}`);
        const recipes = searchJSON.data.recipes.map((recipe) => {
            return new RecipeSearchDTO(recipe.id,recipe.title,recipe.publisher,recipe.image_url);
        });

        // ? Mutating the state for later use of data
        state.search.query = `${API_URL}?search=${query}`;
        state.search.result = recipes;
        
    } catch (error) {
        throw error;
    }
}

export const getSearchResultsPage = function (page) {
        // ? Mutating the state to save the current page number
        state.search.page = page;

        const startPage = (page - 1) * RECIPE_PAGE;
        const endPage = page * RECIPE_PAGE;

        return state.search.result.slice(startPage,endPage);
}

export const updateServings = function (newServings) {
        state.recipe.ingredients.forEach(ingredient => {
            //  ? Formula : newQt = oldQt * newServings / oldServings   
            ingredient.quantity = ingredient.quantity * newServings / state.recipe.servings;
        });

        // * Mutating the old servings in the state
        state.recipe.servings = newServings;
}

const persistBookmarks = function() {

    const filteredBookmarks = state.bookmarks.filter(obj => Object.keys(obj).length !== 0);
    const bookmarksSTR = filteredBookmarks.map((bookmark) => {
            return new RecipeSearchDTO(bookmark.id,bookmark.title,bookmark.publisher,bookmark.imageUrl);
    });
    
    localStorage.setItem("bookmarks",JSON.stringify(bookmarksSTR));
}

const unpersistBookmarks = function() {
    localStorage.clear();
}

export const addBookmark = function(recipe) {
    if(!recipe || recipe == {}) return;
    // Adding recipe to bookmarked
    state.bookmarks.push(recipe);
    
    // Mark Current state recipe as bookmarked
    state.recipe.bookmark();

    // Persisting data to localStorage
    persistBookmarks()
}

export const deleteBookmark = function(recipeId) {

    // Deleting recipe from bookmarks
    const indexOfDeletedRecipe = state.bookmarks.findIndex(recipe => recipe.id === recipeId);

    state.bookmarks.splice(indexOfDeletedRecipe, 1);

    // Mark Current state recipe as Un Bookmarked
    if(recipeId === state.recipe.id) state.recipe.unbookmark();

    // Persisting data to localStorage
    persistBookmarks();
}

// ? We initially grab bookmarks, if exists from localStorage
const init = function() {
    const storage = localStorage.getItem("bookmarks");
    if(storage){
        const bookmarkObjects = JSON.parse(storage);
        state.bookmarks = bookmarkObjects.map((bookmark) => {
            return new RecipeSearchDTO(bookmark._id,bookmark._title,bookmark._publisher,bookmark._imageUrl);
        });
        state.bookmarks.forEach(bookmark => bookmark.bookmark());
        console.log(state.bookmarks);
    }
}

init();