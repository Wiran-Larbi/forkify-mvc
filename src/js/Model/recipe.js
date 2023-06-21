export class RecipeSearchDTO {

    constructor(id,title,publisher,imageUrl) {
        this._id = id;
        this._title = title;
        this._publisher = publisher;
        this._imageUrl = imageUrl;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }

    get publisher() {
        return this._publisher;
    }
    set publisher(publisher) {
        this._publisher = publisher;
    }
    get imageUrl() {
        return this._imageUrl;
    }
    set imageUrl(imageUrl) {
        this._imageUrl = imageUrl;
    }
    toString() {
        return `Recipe(
            id: ${this._id},
            title: ${this._title},
            publisher: ${this._publisher},
            imageUrl: ${this._imageUrl}
        )`;
    }
}
export class RecipeDTO extends RecipeSearchDTO {

    constructor(id,title,publisher,imageUrl,sourceUrl,servings,cookingTime,ingredients) {
        super(id,title,publisher,imageUrl);
        this._sourceUrl = sourceUrl;
        this._servings = servings;
        this._cookingTime = cookingTime;
        this._ingredients = ingredients;
    }

    get sourceUrl() {
        return this._sourceUrl;
    }
    set sourceUrl(sourceUrl) {
        this._sourceUrl = sourceUrl;
    }

    get servings() {
        return this._servings;
    }
    set servings(servings) {
        this._servings = servings;
    }
    
    get cookingTime() {
        return this._cookingTime;
    }
    set cookingTime(cookingTime) {
        this._cookingTime = cookingTime;
    }

    get ingredients() {
        return this._ingredients;
    }
    set ingredients(ingredients) {
        this._ingredients = ingredients;
    }

    toString() {
        return `Recipe(
            id: ${this._id},
            title: ${this._title},
            publisher: ${this._publisher},
            sourceUrl: ${this._sourceUrl},
            imageUrl: ${this._imageUrl},
            servings: ${this._servings},
            cookingTime: ${this._cookingTime},
            ingredients: ${this._ingredients},
        )`;
    }

}