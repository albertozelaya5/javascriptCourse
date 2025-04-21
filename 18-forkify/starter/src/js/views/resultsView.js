import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 1

class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  _generateMarkupPrieview(result) {
    return `
      <li class="preview">
        <a class="preview__link " href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>

          </div>
        </a>
      </li>
    `;
  }

  _generateMarkup() {
    return this._data
      .map(result => {
        return this._generateMarkupPrieview(result);
      })
      .join('');
  }
}

export default new ResultsView();
