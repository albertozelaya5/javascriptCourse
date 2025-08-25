// const header = document.querySelector(".header");
// const sectionHero = document.querySelector(".section-hero");

// function callBack(entries, observer) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) header.classList.add("float");
//   else if (header.classList.contains("float")) header.classList.remove("float");
// }

// const headerObserver = new IntersectionObserver(callBack, {
//   root: null,
//   threshold: 1.0,
//   rootMargin: `${sectionHero.clientHeight - header.clientHeight}px`,
// });

// //* Faltan tantos pixeles para que esto este o deje de ester 100% visible
// //* Si el elemento no se esta intersectando, poner clase
// //* Si lo esta, quitar clase

// //* El sticky hace que se pegue a una posicion del padre, en este caso al top del body cuando el scroll llega a esa posicion

// headerObserver.observe(sectionHero);
