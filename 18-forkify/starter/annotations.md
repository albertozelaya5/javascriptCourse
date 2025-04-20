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