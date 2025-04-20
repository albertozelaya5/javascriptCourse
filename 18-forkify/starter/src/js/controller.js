import * as model from './model.js';
import recipeView from './views/recipeView.js';

// import icons from "../img/icons.svg" // Parcel 1
import 'core-js/stable'; //*Pollyfilling todo lo demás
import 'regenerator-runtime/runtime'; //*Pollyfilling async/await

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id); //* La async function retorna una promesa que es esperada por otra async function, como no retorna nada, no la guardamos en ninguna variable

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
};
//* Solo se va a correr cada que haya un cambio en la búsqueda
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init(); //*Se llama aquí porque aquí se maneja la lógica del MVC
