import icons from 'url:../../img/icons.svg';
import View from './view';

class RecipeForm extends View {
    _parentElement = document.querySelector(".upload");
    _successMessage = "Recipe was Successfully Uploaded ..."; 
    _window = document.querySelector(".add-recipe-window");
    _overlay = document.querySelector(".overlay");
    _btnOpen = document.querySelector(".nav__btn--add-recipe");
    _btnClose = document.querySelector(".btn--close-modal");

    constructor() {
        super();
        this._addHandlerShowForm();
        this._addHandlerHideForm();
    }

    _toggleForm() {
        this._window.classList.toggle("hidden");
        this._overlay.classList.toggle("hidden");
    }

    _addHandlerShowForm() {
        this._btnOpen.addEventListener("click",this._toggleForm.bind(this));
    }
    _addHandlerHideForm() {
        this._btnClose.addEventListener("click",this._toggleForm.bind(this));
        this._overlay.addEventListener("click",this._toggleForm.bind(this));
    }
    _addHandlerRecipeUpload(handler) {
        this._parentElement.addEventListener("submit", function(e) {
            e.preventDefault();
            const recipeDataArr = [...new FormData(this)];
            const recipeData = Object.fromEntries(recipeDataArr);
            handler(recipeData);
        })
    }

}
export default new RecipeForm();