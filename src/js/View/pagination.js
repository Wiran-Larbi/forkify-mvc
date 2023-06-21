import icons from 'url:../../img/icons.svg';
import { RECIPE_PAGE } from '../config.js';
import View from './view.js';

class PaginationView extends View{

    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click' , function (e) {
            const btn = e.target.closest(".btn--inline");
            if(!btn) return; 
            const gotoPage = parseInt(btn.dataset.goto);
            
            handler(gotoPage);
            

        })
    }

    _generateMarkup() {
        const currPage = this._data.page;
        const numPages = Math.ceil(this._data.result.length / RECIPE_PAGE);

        if(! currPage) return "";
        
        // ? case 1 : Page 1, and there are other pages
        if(currPage == 1 && numPages > 1) {
                return this._generateNextBtnMarkup(currPage + 1);
        }

        // ? case 2 : Page 1, and there are no other pages
        if(currPage == 1 && numPages <= 1) {
                return '';
        }
        // ? case 3 : Last Page

        if(currPage == numPages) {
                return this._generatePrevBtnMarkup(currPage - 1);
        }

        // ? case 4 : Other Pages

        if(currPage < numPages) {
                return `${this._generatePrevBtnMarkup(currPage - 1)}${this._generateNextBtnMarkup(currPage + 1)}`;
        }
    }
    _generateNextBtnMarkup(page) {
        return `<button data-goto="${page}" class="btn--inline pagination__btn--next">
        <span>Page ${page}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button>`;
    }
    _generatePrevBtnMarkup(page) {
        return  `<button data-goto="${page}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${page}</span>
        </button>`;
    }


}

export default new PaginationView();