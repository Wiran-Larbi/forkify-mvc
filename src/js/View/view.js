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