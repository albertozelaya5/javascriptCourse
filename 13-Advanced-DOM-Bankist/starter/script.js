'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
//*querySelectorAll deja un nodeList que no es un array, pero posee el metodo forEach
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container'); //* Padre
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// btnsOpenModal.forEach(button => {
//   button.addEventListener('click', openModal);
// });
//*Tiene largo, parecido a un array
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//? Implementing smooth scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

//Button scrolling

///////////////////////////////////////////
btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect(); //*setBounding objeto que contiene las coordeadas
  // console.log(e.target.getBoundingClientRect()); //* El evento.target, es basicamente el elemento seleccionado
  // console.log(s1coords);
  // console.log('Current scroll (X,Y)', window.pageXOffset, pageYOffset); //*Obtener el scroll de la ventana, del viewport, objeto window pagexOffset
  // //*Obtiene la distancia desde la parte superior de la pagina, hasta el top absoluto
  // console.log(
  //   //*Nos da el largo y ancho de lo que estamos viendo
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // console.log(s1coords.left);
  // console.log(window.innerHeight);
  // // window.scrollTo({
  // //   left: s1coords.left + window.pageXOffset,
  // //   top: s1coords.top + window.pageYOffset, //*Se tiene que sumar la altura relativa del viewport, mas la altura absoluta del scroll
  // //   behavior: "smooth"
  // // }); //*ocupamos que este del todo a la izquierda, para el viewport
  // //*
  section1.scrollIntoView({ behavior: 'smooth' }); //*manera moderna
});
///////////////////////////////////////////
// Page navigation
//* No funciona si se repite mucho el comportamiento
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); //*Para prevenir el comportamiento del html
//     console.log('LINK');
//     const id = this.getAttribute('href'); //*Tener el atributo de cada elemento, para obtener la relativa, no absoluta, no this.href, con todo #
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     console.log(this.href); //*
//   });
// });

// 1. Añadir el evento a un padre comun
// 2. Identificar en que elemento fue originado el evento

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault(); //* Se previene que se lleguen a enlaces de inmediato
  console.log(e.target); //*en que elemento se hace el evento click, el padre escucha a los hijos, puede variar, en donde se ejecuta el click

  if (e.target.classList.contains('nav__link')) {
    console.log('llegaste');
    const id = e.target.getAttribute('href'); //*Nos da el id hacia donde queremos ir, se define en el html, obtenemos el #id, que sera el elemento hacia el cual iremos con un scroll suave, el id.scrollIntoView
    console.log(id);
    // elemento.scrollToit({comportamiento})
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//? How the DOM Really Works
//*La interfaz entre el codigo JS y el browser, html documents
//*Allows to make Js interact with the browser, eliminar crear y modificar clases, atributos etc, usar eventos
//*Dom es una Api, Application programming interface, tiene un monton de nodos, organizados en diferentes tipos de objetos
//*Cada elemento es un nodo, y en js se convierte a un objeto que tiene metodos y propiedades
//* Dentro de cada elemento hay hijos como textos, comentarios, documents etc, todo lo que esta en el html pasa al dom, dentro de cada hijo tienen acceso a los metodos
//* Cada elemento puede tener diferentes propiedades, todos funcionan por HERENCIA, los hijos tienen acceso a los metodos de sus nodeTypes padres
//*Document es otro tipo de nodo o node

const fechita = new Date('September 8, 2024');
const options = {
  month: 'long',
  year: 'numeric',
  date: 'numeric',
};
// console.log(new Intl.DateTimeFormat('en-US', options).format(fechita));
console.log(fechita.toISOString().split('T')[0]);

//? Selecting, Creating, and Deleting Elements
//? Selecting elements
console.log(document.documentElement); //*Seleccionar todo el documento html, aplicar estilos globales, head y el body
console.log(document.head); //*No se mira en la page en si
console.log(document.body);

const header = document.querySelector('.header'); //*Primer elemento que coincida
const allSections = document.querySelectorAll('.section'); //*Todos, crea una nodeList, no se actualiza automaticamente
console.log(allSections);
document.getElementById('section--1');
//*Tag === etiqueta
const allButtons = document.getElementsByTagName('button'); //*Nos dara un html collection de todas las etiquetas, que se actualiza automaticamente

console.log(allButtons);

document.getElementsByClassName('btn'); //*get element no ocupa . ni #
// Number.parseInt("2px") //*Encuentra y saca el primer int

//? Creating and inserting elements
// .insertAdjacentHTMl
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.classList.toggle('cookie-message'); //*Si existe lo remueve, sino lo añade
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Goot it!</button>';

// header.prepend(message); //*Añade la etiqueta como el primer hijo de este elemento, en este caso el header
header.append(message); //* Este como el ultimo hijo
//*Message ahora existe dentro del dom, por lo que no puede estar en varios lugares a la vez
//! Un elemento DOM es UNICO, solo puede existir en un lugar a la vez
// header.append(message.cloneNode(true)) //*Significa que tambien se pasaran sus clases y elementos hijos en el true, sus nodos

header.before(message); //*Se pondra como hermano del div, antes de el
header.after(message); //*Lo mismo pero despues del div

//? Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message); //*Antes se usaba este
  });

//? Styles, Attrributes and Classes
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// console.log(message.style.color); //*No se puede obtener el color asi, a menos que lo seteemos desde aqui
// console.log(message.style.backgroundColor);

console.log(getComputedStyle(message)); //*Obtenemos un objeto con todos los estilos
console.log(getComputedStyle(message).height); //*Aqui obtenemos el valor
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; //*Se le pone parseFloat para quitar el px

//!
//*doc.dom.style.setproperty("propiedad", "valor")
document.documentElement.style.setProperty('--color-primary', 'orangered');
//*Con cualquier propiedad del css, incluso variables del root
//!

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.getAttribute('designer')); //*Asi si
logo.setAttribute('company', 'Bankist');
console.log(logo.alt); //*Solo toma propiedades estandar
console.log(logo.className);
//*En classList si se puede añadir
logo.alt = 'Beautiful minimalist logo';
// Non-standard
console.log(logo.designer);

/* function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
} */

console.log(logo.src); //*Aqui me da la url absoluta, no la relativa del html
console.log(logo.getAttribute('src')); //*Para obtener la url relativa

// const link = document.querySelector('.twitter-link');
const link = document.querySelector('.nav__link--btn');
console.log(link.href); //*absoluto
console.log(link.getAttribute('href')); //*relativo

// Data attributes
console.log(logo.dataset.versionNumber); //*Todos los atributos que lleven data, se almacenan en el objeto dataset

//Classes
logo.classList.add('c', 'd');
logo.classList.remove('c', 'e');
logo.classList.toggle('c');
logo.classList.contains('c'); //* not includ3es como en los arrays

//! Dont use
// logo.className = "Jonas" //*Esto anulara todos los demas

console.log([1, 2, 3, 'hola'].indexOf('hola')); //*ubicacion
const s1cords = section1.getBoundingClientRect();

//? Types of Events and Event Handlers
//* Es una señal de algo que ha pasado creado por un dom node

const h1 = document.querySelector('h1'); //*La etiqueta no ocupa punto

const alertH1 = function () {
  //*Es cuando se pone el mouse encima
  // alert('addEventListenerL Freat! You are reading the headding');
  // h1.removeEventListener("mouseenter", alertH1) //*Lo elimina, para eso necesita que la funcion tenga un espacio en memoria
};
h1.addEventListener('mouseenter', alertH1);
//*mouseleave, buscar events mdn, los mas importantes son los relacionados al mouse y al teclado
// h1.onmouseenter = function () { //*Se puede adjuntar directamente al elemento
//   alert('addEventListenerL Freat! You are reading the headding');
// };
//*Hay una propiedad para cada uno, es mas de la vieja escuela, si ponemmos mas de una funcion, se anulara en la vieja escuela

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
//*Despues de 3 segundos se borrara

// <h1 onclick="alert('HTML alert')"></h1> //*De la oldsSchool
//*Propiedad mas importante de los eventos, el burbujeo

//? Event Propagation

// rgb(255,255,255)
/* const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  //*This es como seleccionar el elemento attached to the eventHandler
  //* Donde el evento sucedio, no donde se adjunto el click
  //* Se propaga el bubbling a todos los elementos, haciendo que compartan la clase
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget); //* currentTarget el evento donde se adjunta el controlador de eventos
  console.log(e.currentTarget === this); //*son exactamente los mismos

  // Stop propagation
  // e.stopPropagation(); //*Generalmente no es una buena idea, pero es util para proyectos con varios handlers
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  },
  true
); //*Se puede decidir si se escucha al evento hijo en la fase de captura o capturing, no se suele hacer, pero se obtiene este valor antes en caso de, por defecto esta en falso
 */

//? DOM Traversing

// const h1 = document.querySelector("h1")
console.log(h1.querySelectorAll('.highlight')); //*Selecciona todos los elementos de esa clase que son hijos del h1, no importa que tan profundos esten

console.log(h1.childNodes); //*Todos los nodos, pueden ser textos elementos.clase, etc
console.log(h1.children); //*Tres elmentos, tags, funciona SOLO con hijos directos
h1.firstElementChild.style.color = 'white'; //*El primer hijo, es como element, dqs.dqs, porque funciona en elementos, no solo en documentos
h1.lastElementChild.style.color = 'dark';

// Going upwards = parents
console.log(h1.parentNode); //*El padre directo del elemento
console.log(h1.parentElement); //*Este es usualmente mas usado

// h1.closest('.header').style.background = 'var(--gradient-secondary)'; //* Si se quiere encontrar el padre mas cercano del elemento especifico

// h1.closest('h1').style.background = 'var(--gradient-primary)'; //*Lo mas cercano, que en este caso es el mismo, es lo OPUESTO a querySelector, ya que este busca hijos sin importar la profundidad, y este padres sin importar la profundidad

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling); //*Para los nodos
console.log(h1.nextSibling);

console.log(h1.parentElement.children); //*Todos los hermanos del h1, se selecciona el padre tag, y luego los hijos tag

[...h1.parentElement.children].forEach(el => {
  if (el !== h1) el.style.transform = 'scale(0.5)'; //*Transforma el tamaño de los elementos
});

//? Building a Tabbed Component

// Tab component
/* tabs.forEach(t => {
  t.addEventListener('click', function (e) {
    console.log('tab');
  });
}); //*No es la opcion mas optimizada */

tabContainer.addEventListener('click', function (e) {
  // console.log(e.target.closest('.operations__tab'));

  const clicked = e.target.closest('.operations__tab'); //*Del elemento seleccionado, busca el padre actual mas cercano, sino existe da nulo
  //*Si el padre se llama igual, nos dara el mismo elemento padre, da nulo si no lo encuentra
  // console.log(clicked);

  // Guard clause
  if (!clicked) return; //*Si no se cumple la condicion, se retorna antes

  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //tabsContent
  // console.log(clicked.dataset.tab);
  const selectedTab = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );
  // console.log(selectedTab);
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));
  selectedTab.classList.add('operations__content--active');
});

//? Passing Arguments to Event Handlers
// Menu fade animation
const handleHover = function (e) {
  //*Usar closest cuando hay hijos que podriamos darle click por accidente para un evento, tipo un li dentro de un a
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); //*los hermanos del link
    const logo = link.closest('.nav').querySelector('img'); //*Seleccionara la primera imagen del padre de los enlaces

    //* cambiar la opacidad de todos menos del elemento actualmente seleccionado
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//*mouseentener no burbujea, mouseover SI,
//*Cuando se usa bind debe ser en ambos, se pasa automaticamente el evento e, y this sera el primer argumento
nav.addEventListener('mouseover', handleHover.bind(0.5));
//*Ya que no se quita, se necesita de otro evento, se hace lo mismo pero al reves
nav.addEventListener('mouseout', handleHover.bind(1));

//? Implementing a Sticky navigation : the scroll Event
// Sticky navigation
/* const inicialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function () {
  // console.log(window.scrollY);
  if (window.scrollY > inicialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}); */
//* Esta funcion se llamara cuando el elemento cruce el root exactamente en el procentaje de cruce que nosotros definimos, no importa si scrolleamos arriba o abajo
/* const obsCallBack = function (entries, observer) {
  entries.forEach(entry => console.log(entry));
};
const obsOptions = {
  root: null, //*Si se pone uno, observara como se instersecta el viewport, en si este es el elemento que queremos que se cruce con la section
  threshold: [0, 0.2], //*Se mostrara tan pronto como inicie la pagina, lee tanto valores normales como arrays
};

//? The Intersection Observer API
const observer = new IntersectionObserver(obsCallBack, obsOptions);
observer.observe(section1); */

// const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect(); //*nos da tambien la alturaf
// console.log(navHeight);//*se ocupa el height
const stickyNav = function (entries) {
  const [entry] = entries; //*es un array de solo un objeto
  // console.log(entries);
  // console.log(entry);
  // console.log(entry.isIntersecting);
  if (entry.isIntersecting === false) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight.height}px`, //*Es un cuadro fuera del elemento, es como que lo vuelve mas grande, solo admite pixeles, no cuando pase sino un poco antes
});
headerObserver.observe(header);

//? Revealing Elements on Scroll
// Reveal sections
const allSections2 = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log('🚀 ~ revealSection ~ entry:', entry);

  if (!entry.isIntersecting) return; //*Si no se intersecta no pasa

  entry.target.classList.remove('section--hidden'); //*Se puede poner una clase en el target
  observer.unobserve(entry.target); //*Una vez pasado, se deja de observar y aplicar el efecto a las secciones
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections2.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//? Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]'); //*Selecciona solo las imagenes que tienen esa propiedad

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  //*Es un evento que se dispara tan pronto como termina de cargar la img, por eso hasta que cargue se dispara el evento
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0, //*Como solo se tiene un porcentaje, se hace del 1ro, sino un forEach
  rootMargin: '200px', //*Se pone en negativo para que vaya abajo, positivo arriba, antes de que lleguemos ya se empezara a cargar la imagen a tamaño real
});

imgTargets.forEach(img => imgObserver.observe(img));

//? Building a Slider Component - Part 1
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length; //*Tamaño del nodeList

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible';

  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`)); //*lo quita porque la funcion empieza en 0
  // 0%, 100%, 200%, 300%

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  //*Se recorre todo, e inicia en la posicion 0, 0% o sea en frente, 100% derecha, 200, 300, etc
  // goToSlide(0);

  //Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide); //*Esto es lo mismo solo que se va sumando, inicia 0 por inicializacion, sigue con uno 0 sea 100, a la derecha, y asi
    activateDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      //*Si este contador es
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide); //*Lo mismo solo que a la izquierda
    activateDot(curSlide);
  };

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    //*se selecciona solo el que tenga esa propiedad
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`) //*se usan comillas y luego las dobles para la asignacion en html
      .classList.add('dots__dot--active');
  };
  // createDots();
  function init() {
    goToSlide(0);
    createDots();
    activateDot(0);
  }
  init();

  //Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  // curSlide = 1: -100%, 0, 100%, 200%

  document.documentElement.style.overflowX = 'hidden';
  //?Building a Slider Component: Part 2

  //*en keydown o keyup se guardan eventos de teclado, con el evento
  document.addEventListener('keydown', function (e) {
    // e.preventDefault()
    console.log(e.key === 'ArrowLeft'); // ArrowLeft ArrowLeft
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  // const createDots = function () {
  //   const h1 = document.createElement('h1');
  //   h1.textContent = 'hola';
  // document.body.append(h1);

  // activateDot(0);
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      //*Event delegation
      console.log('botonaso');
      const { slide } = e.target.dataset; //*Se puede destructurar porque dataset es un objeto
      goToSlide(slide); //*Se manda el numero que se guarda en le data, y eso se envia como argumento
      // e.target.classList.add('dots__dot--active');
    }
  });
  console.log(getComputedStyle(dotContainer));
};
slider();

//? Lifecycle DOM Events
//*Se carga tan pronto como se descarga el html, construyendo el arbol DOM, sin esperar a que se carguen las imágenes y otros recursos
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built: ', e);
});

//*Cuando la pagina esta completamente cargada
window.addEventListener('load', function (e) {
  console.log('Page fully loaded: ', e);
});
//*Se puede ver en el f12 cuanto tardo en cargar etc
//*Se carga justo antes de que un usuario recargue la pagina
/* window.addEventListener('beforeunload', function (e) {
  //*si estan listos para cerrar la pagina
  e.preventDefault();
  console.log(e);
  e.returnValue = ''; //*se establece este valor a vacio para que aparezca la advertencia
});
 */
//*Solo usarlo cuando se pueda perder informacion

//? Efficient Script Loading: defer and async
{
  /* <script defer src="script.js"></script>; */
}
