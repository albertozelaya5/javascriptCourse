## Fixing a Small Scrolling Bug

Esto ocurre porque solo se quita la clase `sticky` en un punto en especifico, no cuando carga la pagina

Ahora bien, la API de `new IntersectionObserver()`, va a observar todos los elementos que le pasemos cuando el DOM se carga por primera vez

Al momento de consolearlo, al inicio muestra todas las entries o sea los elementos registrados

```js
const revealSection = function (entries, observer) {
  console.log(entries);
  const [entry] = entries;
  /* RESTO DEL CÓDIGO */
};
```

Pero nosotros solo aplicábamos los cambios al primer elemento de ellos, cuando hay mas de un `entry`, se necesita recorrerlos para aplicar el código

```js
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
```

Aquí se aplica el código cuando se recorren, y a todas las section, al inicio se les pone la clase `'section--hidden'`
