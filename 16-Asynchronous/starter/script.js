'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg); //*hace lo mismo que el insert adjacent html solo que solo son texto
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
          <img class="country__img" src="${data?.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data?.name.common}</h3>
            <h4 class="country__region">${data?.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data?.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data?.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.keys(data?.currencies)[0]
            }</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = '1';
};

///////////////////////////////////////
//? Our Firs AJAX Call:XMLHttpRequest
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest(); //* Se crea nuevo objeto
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   // console.log(request.responseText); //* Solo esta dentro del evento

//   request.addEventListener('load', function () {
//     //* responseText se establecerá cuando los datos hayan llegado
//     // console.log(JSON.parse(this.responseText)); //* SIEMPRE apuntara al elemento al que se hace aEL
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `<article class="country">f
//           <img class="country__img" src="${data?.flags.png}" />
//           <div class="country__data">
//             <h3 class="country__name">${data?.name.common}</h3>
//             <h4 class="country__region">${data?.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data?.population / 1000000
//             ).toFixed(1)}M people</p>
//             <p class="country__row"><span>🗣️</span>${
//               Object.values(data?.languages)[0]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               Object.keys(data?.currencies)[0]
//             }</p>
//           </div>
//         </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = '1';
//   });
// };

// getCountryData('portugal'); //*Pasan al mismo tiempo y a su tiempo
// //* Si los quisiéramos hacer en orden, tendríamos que encadenarlas, solo al obtener la data de una pedir la otra etc
// getCountryData('usa');
// getCountryData('germany');

// console.log(Math.floor(4.4)); //* Retorna el decimal mas pequeño
// console.log(Math.ceil(4.4)); //* Retorna el decimal mas grande

// console.log('https://restcountries.com/v3.1/name/portugal');

//? Welcome to Callback Hell
// const getCountryAndNeighbour = function (country) {
//   // AJAZ call country 1
//   const request = new XMLHttpRequest(); //* Se crea nuevo objeto
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   // console.log(request.responseText); //* Solo esta dentro del evento

//   request.addEventListener('load', function () {
//     //* responseText se establecerá cuando los datos hayan llegado
//     // console.log(JSON.parse(this.responseText)); //* SIEMPRE apuntara al elemento al que se hace aEL
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbor country (2)
//     const neighbor = data.borders?.[0];

//     if (!neighbor) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest(); //* Se crea nuevo objeto
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log('🚀 ~ data2:', data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

//* Ahora imagina se quieren renderizar los hermanos de los hermanos, y luego los hermanos de esos hermanos, para esa secuencia de llamadas se tiene un nombre "Callback Hell"
//* El código que es difícil de entender, es básicamente mal código

// getCountryData('portugal'); //*Pasan al mismo tiempo y a su tiempo
//* Si los quisiéramos hacer en orden, tendríamos que encadenarlas, solo al obtener la data de una pedir la otra etc
// getCountryData('usa');
// getCountryAndNeighbour('usa');
/
// console.log(Math.floor(4.4)); //* Retorna el decimal mas pequeño
// console.log(Math.ceil(4.4)); //* Retorna el decimal mas grande
//!
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//     }, 3000);
//   }, 1000);
// }, 1000);
//* Todo este infierno se soluciona con promesas

//? Promises and the Fetch API
//   const request = new XMLHttpRequest(); //* Se crea nuevo objeto
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

// const request = fetch('https://restcountries.com/v3.1/name/portugal'); //*abrir y enviar la solicitud, para una sencilla solo el link
// console.log(request); //*Una promesa obj es como un placeholder para el futuro resultado de una operación asíncrona
//* Como un contenedor para un valor futuro

//* Es como un ticket, tengo la promesa de que recibiré dinero si tengo el numero correcto
//* Con esto no necesitamos event handlers, y podemos encadenar promesas futuras, ES6

// const getCountryData = function (country) {
//   //prettier-ignore
//   fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response){
//     console.log(response); //*Se crea un obj llamado respuesta, que asume que la data este buena, y obtiene como arg ese resultado
//     return response.json() //*se lee el body y se convierte la data mediante el json
//   }).then(function(data){
//     console.log(data);
//     renderCountry(data[0])
//   })
// };

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(
//       response => {
//         console.log(response);

//         // if (!response.ok) {
//         //   throw new Error(`Country not found (${response.status})`); //* rellena el obj error que sale en catch, termina la función como return, se propagara hasta el catch
//         // }
//         return response.json();
//       }
//       // err => alert(err)
//     ) //*siempre retornara una promesa
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbor = data[0]?.borders[0];
//       const neighbor = 'awer8sdjfkn';

//       if (!neighbor) return; //* No va a funcionar

//       // Country 2 //* se tiene que retornar para devolver el then method
//       // return 23; //*fullField o valor cumplido de la promesa que manejamos
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`); //! NO PONER THEN AQUÍ
//       //* Esto attach una callback dentro de otra, lo que hace un spaghetti
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`); //* rellena el obj error que sale en catch, termina la función como return, se propagara hasta el catch
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     }) //* Catch es para atrapar errores en una promesa en caso de que ocurran
//     .catch(err => {
//       //* A veces ver el stack trace del error nos puede decir donde ocurre el error
//       console.error(`${err} 💥💥🧨`); //*error como tal es un objeto, entonces podemos hacer uso de el, mapearlo, etc, aquí solo es todo el objeto
//       renderError(`Something went wrong 💥💥🧨 ${err.message}. Try again`);
//       //*En vez de poner como 2 arg siempre, al final de toda la cadena then se usa catch, atrapara cualquier error en donde ocurre en la cadena de promesas
//     }) //*Catch TAMBIÉN retorna un obj promise
//     .finally(() => {
//       //*Este método se usa al final, siempre pasa sea la promesa sea rejected or fullField, siempre que retorne una promesa
//       countriesContainer.style.opacity = '1';
//     });
//   //! El fetch promise solo rechaza cuando no hay conexión a internet, con 404 todavía se completara
// };

const getJson = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`); //* rellena el obj error que sale en catch, termina la función como return, se propagara hasta el catch
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJson(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0]?.borders[0];
      console.log('🚀 ~ getCountryData ~ neighbor:', neighbor);
      // const neighbor = 'awer8sdjfkn';

      // if (!neighbor) return; //* No va a funcionar
      if (!neighbor) throw new Error('No neighbor found!');

      // Country 2 //* se tiene que retornar para devolver el then method
      // return 23; //*fullField o valor cumplido de la promesa que manejamos
      return getJson(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      //* Error handler
      // console.error(`${err} 💥💥🧨`);
      renderError(`Something went wrong 💥💥🧨 ${err.message}. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = '1';
    });
  //! El fetch promise solo rechaza cuando no hay conexión a internet, con 404 todavía se completara
};

// btn.addEventListener('click', function () {
//   // getCountryData('germany');
//   // whereAmI(52.508, 13.381);
//   // whereAmI(19.037, 72.873);
//   whereAmI(-33.933, 18.474);
// });

// getCountryData('australia');
//? Handling Rejected Promises

//TODO Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

//`https://restcountries.com/v3.1/name/${country}`
//* Part 1
// const whereAmI = function (lat, lng) {
//   const request = fetch(
//     `https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//   );
//   request
//     .then(resp => {
//       // console.log(resp);
//       if (!resp.ok) {
//         throw new Error(`alv se te fue el inter ${resp.status}`);
//       }
//       return resp.json();
//     })
//     .then(data => {
//       // console.log(data);
//       const { city, countryName } = data;
//       console.log(`You are in ${city}, ${countryName}`);

//       // renderCountry(data[0]);

//       return fetch(`https://restcountries.com/v3.1/name/${countryName}`);
//       // getCountryData(countryName);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       // console.log(data);
//       renderCountry(data[0]);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = '1';
//     });
//   // .catch(err => console.log(`Hay errores: ${err.message}💥🧨`))
//   // .finally(() => {
//   //   countriesContainer.style.opacity = '1';
//   // });
// };

//? The Event Loop in practice
// console.log('Test start'); //*Ambos console se ejecutan primero porque son sincronos
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolver promise 1').then(res => console.log(res)); //*se ejecutara antes que el timer porque se guarda en microtasks que tiene prioridad sobre el queue

// Promise.resolve('Resolver promise 2').then(res => {
//   for (let i = 0; i < 1000; i++) {}
//   console.log(res);
// }); //*Debido a que tiene prioridad, puede retrasar las demás tareas si esta tiene una que demande mucho tiempo
// console.log('Test end');

//? Building a Simple Promise
//*Se hace una promesa
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lotter draw is happening ');
//   setTimeout(function () {
//     if (Math.random >= 0.5) {
//       resolve('You WIN💸💸💸1');
//     } else {
//       reject(new Error('You lost your money 🤒'));
//     }
//   }, 2000);
// });
//* Y como se devuelve una promesa, se usa el then
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  }); //*retornara una promesa que se puede thenear
};

// wait
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 second passed');
//     return wait(1);
//   })
//   .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//     }, 3000);
//   }, 1000);
// }, 1000);

Promise.resolve('abc').then(x => console.log(x));
//* El arg de then solo funciona cuando se retornara algo
//* reject no tiene then ya que no retorna una promesa ni nada
// Promise.reject(new Error('Problem!')).catch(x => console.log(x));

//? Promisifying the Geolocation API

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );

// const getPosition = function () {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       position => resolve(position),
//       err => reject(err)
//     );
//     //*se pasaran como argumentos el location y err en las callBacks como objetos this
//     // return navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// // getPosition().then(pos => console.log(pos));
// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(
//         `https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//       );
//     })
//     .then(resp => {
//       // console.log(resp);
//       if (!resp.ok) {
//         throw new Error(`alv se te fue el inter ${resp.status}`);
//       }
//       return resp.json();
//     })
//     .then(data => {
//       const { city, countryName } = data;
//       console.log(`You are in ${city}, ${countryName}`);

//       // renderCountry(data[0]);

//       return fetch(`https://restcountries.com/v3.1/name/${countryName}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       // console.log(data);
//       renderCountry(data[0]);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = '1';
//     });
// };
// btn.addEventListener('click', whereAmI);

//? Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   }); //*retornara una promesa que se puede thenear
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       //*evento por si falla el imgPath
//       reject(new Error('Image not found'));
//     });
//   });
// };
// let currImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currImg.style.display = 'none'; //*están en el mismo nivel
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => (currImg.style.display = 'none'))
//   .catch(err => console.log(err));
// console.log(currImg);

//? Consuming Promises with Async/Await

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err) //*lo envolvemos en una promesa para obtener el error y resultado
    );
    //*se pasaran como argumentos el location y err en las callBacks como objetos this
    // return navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// prettier-ignore
// fetch(`https://restcountries.com/v3.1/name/${country}`).then(res=>console.log(res)) //*Es exactamente lo mismo
// console.log(res);
const whereAmI = async function () { //*función async siempre retorna una promesa
  try{
  // Geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  // Rverse geocoding
  const resGeo = await fetch(
    `https://api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  ); //*Solo tira error cuando no esta conectado a internet, no en el 403 o 404
  if(!resGeo.ok) throw new Error("Problem getting location data")
  const dataGeo = await resGeo.json();

  // Country data
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${dataGeo.countryName}`
  );
  if (!res.ok) throw new Error('Problem getting location main data'); //*Aquí si

  const data = await res.json() //*Aquí la función se detiene hasta que se resuelve esta promesa
  renderCountry(data[0]);

  return `Youre in ${dataGeo.city}, ${dataGeo.countryName}`;
} catch(err){ //*tiene acceso a cualquier error que ocurra en el bloque try
    renderError(`Something went wrong ${err.message}🧨`)

    // Reject promise returned from async function
    throw err
  }
};

//? Error Handling with try catch

// try {
//   //*tratara de ejecutar este fragmento de código
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message); //*siempre le obj de error trae un message
// }

// {
//   console.log('holis');
// }

//? Returning values from async functions
console.log('1: Will get location');
// const city = whereAmI();
// whereAmI() //*aunque de o no, siempre se llenara, por eso hay que mandar el error
//   .then(city => console.log(city))
//   .catch(err => console.error(`2: ${err.message} 🧨`))
//   .finally(() => console.log('3: Finished getting location')); //*si se quiere catchear el error se debe de lanzar
// // console.log('2: Finished getting location');
//* IIFE, funciones anónimas que se ejecutan de inmediato
// (async () => {
//   try {
//     const city = await whereAmI();
//     console.log(city);
//   } catch (err) {
//     console.error(`2: ${err.message} 🧨`);
//   }
//   console.log('3: Finished getting location');
// })();

//? Running Promises in Parallel
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     //*Si se pone un await luego de otro, por defecto, hasta que se complete el primero correrá el segundo
//     const data = await Promise.all([
//       //*si una falla todas fallan, se puede usar con then
//       getJson(`https://restcountries.com/v3.1/name/${c1}`),
//       getJson(`https://restcountries.com/v3.1/name/${c2}`),
//       getJson(`https://restcountries.com/v3.1/name/${c3}`),
//     ]); //*retorna una nueva promesa que corre todas las promesas al mismo tiempo

//     const capitalCities = data.map(d => {
//       // prettier-ignore
//       const [{ capital: [firstCapital] }] = d;

//       return firstCapital;
//     });
//     console.log(capitalCities);
//   } catch (err) {
//     console.log(`alaaaa: ${err}}`);
//   }
// };
// get3Countries('portugal', 'canada', 'tanzania');

// //? Other Promise Combinators: race, allSetted and any

// //* Promise.race
// (async function () {
//   const res = await Promise.race([
//     //*recibe un array, y retorna la promesa que se ejecuto mas rápido
//     getJson(`https://restcountries.com/v3.1/name/italy`), //*aunque alguna de error, retornara la primera
//     getJson(`https://restcountries.com/v3.1/name/egypt`),
//     getJson(`https://restcountries.com/v3.1/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(() => {
//       reject(new Error('request took to long!'));
//     }, [sec * 1000]);
//   });
// };

// Promise.race([
//   //*este y el Promise all suelen ser los mas usados
//   //*recibe un array, y retorna la promesa que se ejecuto mas rápido
//   getJson(`https://restcountries.com/v3.1/name/italy`), //*aunque alguna de error, retornara la primera
//   getJson(`https://restcountries.com/v3.1/name/mexico`),
//   timeout(1),
// ])
//   .then(res => console.log("ey vo", res[0]))
//   .catch(err => console.error("error race", err)); //*siempre se ejecuta

// //* Promise.allSettled, similar al all, solo que este aunque uno no de, retornara todo, y el all si uno no da se detiene
// //* Promise.resolve, crea una promesa que automáticamente se resuelve
// Promise.allSettled([
//   //*ES2020
//   Promise.resolve('success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('another success'),
// ])
//   .then(res => console.log('result all settled: ', res))
//   .catch(err => console.error('all settled', err)); //*nos los dará junto con su status
// //* Promise.any ES2021
// Promise.any([
//   Promise.resolve('success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('another success'),
// ])
//   .then(res => console.info(`Any: ${res}`)) //* Devolverá la primera promesa cumplida e ignorara las demás, siempre sera fullField a menos que todas sean rejected
//   .catch(err => console.error(err));

//? Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      //*evento por si falla el imgPath
      reject(new Error('Image not found'));
    });
  });
};
// Part 1
const loadNPause = async function () {
  try {
    // Load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    // Load image 2
    img = await createImage('img/img-2.jpg');
    console.log('image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (error) {
    console.log('ala prro', error);
  }
};
// loadNPause();

// Part 2
const loadAll = async function (...imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img)); //*Las async functions devuelven promesas
    console.log(imgs);

    const imggsEl = await Promise.all(imgs); //*array de promesas
    console.log(imggsEl);
    imggsEl.forEach(img => img.classList.add('parallel'));
  } catch (error) {
    console.log('loadAll', error);
  }
};
loadAll('img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg');
