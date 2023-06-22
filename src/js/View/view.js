import icons from 'url:../../img/icons.svg';
export default class View {
    _parentElement;
    _errorMessage;
    _successMessage;
    _data;

    render(data) {
        this._data = data;
        if(!this._data || (Array.isArray(this._data) && this._data.length == 0 )) return this.renderError(this._errorMessage);
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    // * Algorithm to Update only attributes and text values ~ Better than render method
    update(data) {
      this._data = data;
      const newMarkup = this._generateMarkup();

      // ? Converting a markup string to a dom elements
      const VirtualDOM = document.createRange().createContextualFragment(newMarkup);
      const VirtualElements = Array.from(VirtualDOM.querySelectorAll('*'));
      const RealElements = Array.from(this._parentElement.querySelectorAll('*'));

      // * Comparing the Virtual Elements w/ Real Elements
      VirtualElements.forEach((virtEl,ind) => {
          const realEl = RealElements[ind];        
          // * Changing the text content
          if(!virtEl.isEqualNode(realEl) && virtEl.firstChild?.nodeValue.trim() !== '') {
              realEl.textContent = virtEl.textContent;
            }
            // * Changing the attributes
          if(!virtEl.isEqualNode(realEl)) {
              Array.from(virtEl.attributes).forEach(attr => {
                realEl.setAttribute(attr.name,attr.value);
              })
          } 
      })
      

    }
    
    renderSpinner() {
            const markup = `<div class="spinner">
                            <svg>
                            <use href="${icons}#icon-loader"></use>
                            </svg>
                            </div>
                `;
            this._clear();
            this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    renderError(message=this._errorMessage) {
          const markup = `<div class="error">
                      <div>
                        <svg>
                          <use href="${icons}#icon-alert-triangle"></use>
                        </svg>
                      </div>
                      <p>${message}</p>
                      </div>`;
          this._clear();
          this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    renderSuccess(message=this._successMessage) {
          const markup = `<div class="message">
                      <div>
                        <svg>
                          <use href="${icons}#icon-smile"></use>
                        </svg>
                      </div>
                      <p>${message}</p>
                    </div>`;
            this._clear();
            this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
    _clear() {
        this._parentElement.innerHTML = ''; 
     }

}