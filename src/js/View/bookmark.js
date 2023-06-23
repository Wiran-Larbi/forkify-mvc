import View from "./view.js";
import icons from 'url:../../img/icons.svg';
class BookmarkView extends View {

    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = "No bookmarked recipes, try find some cool recipes ...";
    _data;

    addHandlerRender(handler) {
        window.addEventListener("load",handler);
    }

    _generateMarkup() {
        // * Taking the hash from url to test if a certain recipe is active
        const resultMarkup = this._data.map(this._generateMarkupPreview).join('');
        
        return resultMarkup;
      }
      
      _generateMarkupPreview(result) {
       const id = window.location.hash.slice(1);
      return `
      <li class="preview">
      <a class="preview__link ${result.id == id ? "preview__link--active" : ""}"  href="#${result.id}">
        <figure class="preview__fig ">
          <img src="${result.imageUrl}" crossOrigin="anonymous" alt="recipe image" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
          <div class="preview__user-generated ${result.hasKey() ? '' : "hidden"}">
          <svg>
           <use href="${icons}#icon-user"></use>
          </svg> 
          </div>
        </div>
        
      </a>
    </li>
      `;

    }
}
export default new BookmarkView();