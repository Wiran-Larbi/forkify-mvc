import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './view.js';
import { MAX_SERVINGS,MIN_SERVINGS } from '../config.js';

class RecipeView extends View{

    _parentElement = document.querySelector(".recipe");
    _errorMessage = "Couldn't find Recipe ... 💭";
    _successMessage = "Start by searching for a recipe or an ingredient. Have fun!";
    
   

    _generateMarkup() {
              // ? Generating the ingredients Markup
              const ingredientsMarkup =  this._data.ingredients.map((ingredient) => {
                  return `<li class="recipe__ingredient">
                          <svg class="recipe__icon">
                            <use href="${icons}#icon-check"></use>
                          </svg>
                          <div class="recipe__quantity">${ingredient.quantity ? new Fraction(ingredient.quantity).toString() : ''}</div>
                          <div class="recipe__description">
                            <span class="recipe__unit">${ingredient.unit}</span>
                            ${ingredient.description}
                          </div>
                          </li>`; 
                }).join(''); 

                    // ? Generating the recipe Markup
                    const RecipeMarkup =`
                    <figure class="recipe__fig">
                    <img src="${this._data.imageUrl}" crossOrigin="anonymous" alt="recipe image" class="recipe__img" />
                    <h1 class="recipe__title">
                      <span>${this._data.title}</span>
                    </h1>
                    </figure>

                    <div class="recipe__details">
                    <div class="recipe__info">
                      <svg class="recipe__info-icon">
                        <use href="${icons}#icon-clock"></use>
                      </svg>
                      <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
                      <span class="recipe__info-text">minutes</span>
                    </div>
                    <div class="recipe__info">
                      <svg class="recipe__info-icon">
                        <use href="${icons}#icon-users"></use>
                      </svg>
                      <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
                      <span class="recipe__info-text">servings</span>
                      <div class="recipe__info-buttons">
                        <button data-servings-to="${this._data.servings - 1}" class="btn--update-servings btn--tiny btn--increase-servings">
                          <svg>
                            <use href="${icons}#icon-minus-circle"></use>
                          </svg>
                        </button>
                        <button data-servings-to="${this._data.servings + 1}" class="btn--update-servings btn--tiny btn--increase-servings">
                          <svg>
                            <use href="${icons}#icon-plus-circle"></use>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div class="recipe__user-generated">
                    <!--
                      <svg>
                        <use href="${icons}#icon-user"></use>
                      </svg>
                      -->
                    </div>
                        <button class="btn--round btn--bookmark">
                          <svg class="">
                            <use href="${icons}#${this._data.isBookmarked == true ? "icon-bookmark-fill" : "icon-bookmark"}"></use>
                          </svg>
                        </button>
                    </div>

                    <div class="recipe__ingredients">
                    <h2 class="heading--2">Recipe ingredients</h2>
                    <ul class="recipe__ingredient-list">
                      <!-- Here Where the infredients are inserted ! -->
                      ${ingredientsMarkup}
                    </ul>
                    </div>

                    <div class="recipe__directions">
                    <h2 class="heading--2">How to cook it</h2>
                    <p class="recipe__directions-text">
                      This recipe was carefully designed and tested by
                      <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
                      directions at their website.
                    </p>
                    <a
                      class="btn--small recipe__btn"
                      href="${this._data.sourceUrl}"
                      target="_blank"
                    >
                      <span>Directions</span>
                      <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                      </svg>
                    </a>
                    </div>
                    `;

                    return RecipeMarkup;
      
    }

    // ? Handling the render of the recipe
    addHandlerRender(handler) {
      // ? Listening to hash and load changing
      const events = ["hashchange","load"];
      events.forEach(e => window.addEventListener(e,handler));
    }
    // ? Handling the update of the servings
    addHandlerUpdateServings(handler) {
      // ? Listening to update buttons clicks
      this._parentElement.addEventListener("click", function(e) {
        const btn = e.target.closest(".btn--update-servings");
        if(!btn) return;

        const newServings = parseInt(btn.dataset.servingsTo);
        if(newServings < MIN_SERVINGS || newServings > MAX_SERVINGS) return;

        handler(newServings);
      }); 
    }

    addHandlerBookmark(handler) {
      this._parentElement.addEventListener("click", function(e) {
        const btn = e.target.closest(".btn--bookmark");
        if(!btn) return;

        handler();
      })
    }

    
}

export default new RecipeView();