import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// import icons from "../img/icons.svg" // Parcel 1
import 'core-js/stable'; //*Pollyfilling todo lo demás
import 'regenerator-runtime/runtime'; //*Pollyfilling async/await

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) module.hot.accept();

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id); //* La async function retorna una promesa que es esperada por otra async function, como no retorna nada, no la guardamos en ninguna variable

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);

    // TEST
    controlServings(4);
  } catch (err) {
    recipeView.renderError();
    // ${err} 💥💥💥
    console.log(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // resultsView.render(mode.state.search.results);
    //*Estos son para la initialization de la vista, donde pone los elementos del 1-10, y la pagination por defecto
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlServings = function () {
  // Update the recipe servings (in state)
  model.updateServings(8);
  // Update the recipe view
  recipeView.render(model.state.recipe);
};

const controlPagination = function (gotoPage) {
  //*Estos son cuando ocurre el evento de darle click al botón de pagination
  // 3) Render NEW results
  // resultsView.render(mode.state.search.results);
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // 4) Render NEW initial pagination buttons
  paginationView.render(model.state.search);
};

//* Solo se va a correr cada que haya un cambio en la búsqueda
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init(); //*Se llama aquí porque aquí se maneja la lógica del MVC
