import * as model from './model.js';
import recipeView from './views/recipeView.js';

// import icons from "../img/icons.svg" // Parcel 1
import icons from 'url:../img/icons.svg'; // Parcel 1
import 'core-js/stable'; //*Pollyfilling todo lo demás
import 'regenerator-runtime/runtime'; //*Pollyfilling async/await
console.log(icons);

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const renderSpinner = function (parentEl) {
  const markup = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;

  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    renderSpinner(recipeContainer);

    // 1) Loading Recipe
    await model.loadRecipe(id); //* La async function retorna una promesa que es esperada por otra async function, como no retorna nada, no la guardamos en ninguna variable

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    alert(err);
  }
};
//* Solo se va a correr cada que haya un cambio en la búsqueda
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
