import { getJSON } from "../handler";
import RecipeDTO from "./recipe";
import { API_URL } from "../config";

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

    let recipe = new RecipeDTO(id,title,publisher,source_url,image_url,servings,cooking_time,ingredients);

    // ? Mutating the state for later use of data
    state.recipe = recipe;

    } catch (error) {
        throw error;
    }
}