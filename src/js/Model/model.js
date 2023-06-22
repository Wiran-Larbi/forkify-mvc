import { getJSON } from "../handler";
import {RecipeDTO, RecipeSearchDTO} from "./recipe.js";
import { RECIPE_PAGE,API_URL } from "../config";


export const state = {
    recipe: {},
    search: {},
    bookmarks: {}
}

export const loadRecipe = async function(recipeId) {

    try {
       
    const recipeJSON = await getJSON(`${API_URL}/${recipeId}`);
    // * Loading the recipe
    const {id,title,publisher,source_url,image_url,servings,cooking_time,ingredients} = recipeJSON.data.recipe;

    let recipe = new RecipeDTO(id,title,publisher,image_url,source_url,servings,cooking_time,ingredients);

    // ? Mutating the state for later use of data
    state.recipe = recipe;

    

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