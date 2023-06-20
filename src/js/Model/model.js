import RecipeDTO from "./recipe";

export const state = {
    recipe: {},
    search: {},
    bookmarks: {}
}

export const loadRecipe = async function(recipeId) {

    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`, {
      headers: {
        'Cross-Origin-Resource-Policy': 'same-site'
      }});

    const data = await res.json();
    if(!res.ok) throw new Error(`${data.message} (status : ${res.status})`);
    
    // * Loading the recipe
    const {id,title,publisher,source_url,image_url,servings,cooking_time,ingredients} = data.data.recipe;

    let recipe = new RecipeDTO(id,title,publisher,source_url,image_url,servings,cooking_time,ingredients);

    // ? Mutating the state for later use of data
    state.recipe = recipe;

    } catch (error) {
        console.log(error);
    }
    

}