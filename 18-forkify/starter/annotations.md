# Forkify App

!(userStore)["./flowChart.png"]

### User story

Es la descripción de la aplicacion por medio de la perspectiva del usuario, por ejemplo

- Como cliente, quiero buscar las recetas, para buscar nuevas ideas de comida
- Como cliente, quiero ser capaz de actualizar el numero de servicios, asi puedo preparar para diferentes cantidades de personas
- Como cliente, quiero un pineado de favoritos, para poder ver las recetas despues
- Quiero crear mis propias recetas, asi puedo tenerlas todas en una misma app
- Quiero ver mis recetas y favoritos aun cuando cierre la app y me vaya

Para los programas de la vida real, se necesitan las peticiones del usuario (user stories) y tambien un diagrama o una manera de ver como va a funcionar la aplicacion en su flujo

Para inicializar un proyecto se pone

```
npm init
```

Para instalar la ultima version de parcel se usa>>ria

```
npm i parcel -D, npm i parcel@2, npm i parcel@next -D
```

Con @ para la version, el @next es para decir la version preliminar, el D es lo mismo que --save-dev

Asimismo, para iniciar una app, en el npm run start, no se necesita el run para acceder al objeto scripts del package.json, sino simplemente poner "npm start"

Cuando se usa sass, se referencia asi en el header:

```
    <link rel="stylesheet" href="src/sass/main.scss" />
```

En parcel ya no se usa el _defer_, sino que por defecto ahora acepta el _type="module"_ que permite el import y export y por defecto ya es defer

Para mandar parámetros en una URL se usa

```
const params = new URLSearchParams({
  search: 'pizza',
  page: 2,
  lang: 'es'
});

const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?${params}`);
```

Para poner un elemento en diferentes posiciones de un html usamos:

```
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
```

También se usa _innerHTML_ para obtener el valor html que esta dentro de ese Element
Asimismo, si se agrupan varios html en uno solo se puede recibir mejor, con join:

```
          ${recipe.ingredients
            .map(ing => {
              return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>`;
            })
            .join('')}
```

### Pollyfilling

También, para que haya compatibilidad con multiples navegadores, se hace con las bibliotecas core-js y regenerator-runtime, el primero es para cosas generales, y el segundo para _async/await_ features, se usan de esta manera:

```
import "core-js/stable"
import "regenerator-runtime/runtime" //
```

## Listening for Load and hash change Events

Se usa el href del anchor para llevar a otras partes del sitio dentro del html:

```
          <a href="#664c8f193e7aa067e94e8297">RECIPE</a>
```

También se usa _window.location.hash_ para obtener le # de la dirección de la url de nuestra propia pagina

Para captar el estado cada que cambia la url, y cada que carga la pagina se usan:

```
window.addEventListener('hashchange', showRecipe);
window.addEventListener('load', showRecipe);
```

O cuando se tienen varios eventos que se quieren usar con event handler se puede hacer asi:

```
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
```

## The MVC Architecture

Por que es importante la arquitectura?

- La estructura, es la forma en la que organizamos nuestro código (modulos, clases y funciones)
- Maintainability: Pensamos que le proyecto nunca se termina, y para mejorarlo en el futuro debemos hacerlo fácil de entender, para que también sea escalable
- Expandability: La opción de poner nuevas cosas en el futuro

Pero cuando se hace mas grande, es difícil mantenerlo asi por nuestra cuenta, en lugar de eso usamos estructuras ya establecidas como MVC, MVP, Flux, etc.

![architectureMap](./courseImages/image.png)
![MVCMap](./courseImages/MVCarchi.png)

Por ejemplo, al pasar algo con el usuario, esto llega al controlador, que distribuye las tareas en caso le toque al modelo, o a la vista actualizar los datos mostrados

Luego si el modelo ocupa hacer una petición se la mandara al controller, que este a su vez hará la lógica de mostrarlo en la vista, el _Model_ y el _View_ nunca se tocan ni saben de la existencia del otro.

Cuando se esta dentro de una clase, se puede asignar información de esta manera:

```
  render(data) {
    this.#data = data; //*Cuando se llama, guarda la data que se le da en esa variable privada
  }
```

Para asi luego acceder desde cualquier parte de la clase como _this.#data_, tampoco importa el orden de los métodos, pueden usarse antes o después de ser creados