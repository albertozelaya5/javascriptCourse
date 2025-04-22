import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 1

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
    handler();
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const _generateMarkupButton = function (cur) {
      if (curPage > cur) {
        return `
        <button data-goto="${cur}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${cur}</span>
        </button>
        `;
      }
      if (curPage < cur) {
        return `
        <button data-goto="${cur}" class="btn--inline pagination__btn--next">
        <span>Page ${cur}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
        `;
      }
    };

    console.log(numPages);
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return _generateMarkupButton(curPage + 1);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return _generateMarkupButton(curPage - 1);
    }

    // Other page
    if (curPage < numPages) {
      return `
      ${_generateMarkupButton(curPage - 1)}
      ${_generateMarkupButton(curPage + 1)}
      `;
    }

    // Page 1, and there are NO other pages
    console.log(curPage);
    if (curPage === 1 && curPage === numPages) {
      return '';
    }
  }
}

export default new PaginationView();
