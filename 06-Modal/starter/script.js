'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
// const btnsOpenModal = document.querySelector('.show-modal'); //* Cuando se usa querySelector solo se selecciona uno, se usa el querySelectorAll
const btnsOpenModal = document.querySelectorAll('.show-modal'); //*Funcionan como Arrays, para manejarlos se usara un loop

console.log(btnsOpenModal);

// console.log(
//   `Prueba de contenido ${document.querySelectorAll('.show-modal').textContent}` //saldra indefinido si mandamos solamente uno
// );

const openModal = () => {
  console.log('Button clicked'); //*classList para llamar las clases, no className
  modal.classList.remove('hidden', 'masClases'); //para remover elementos
  overlay.classList.remove('hidden'); //*La propiedad style es individual
};
//*El querySelectorAll es para usarlo como un loop
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);
//Mejor usar clases y luego esas clases solo se quitan o muestran

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal); // se pone como expresion porque lo queremos SOLO cuando se de click, por eso sin parentesis

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  console.log(e.key);
  console.log(typeof e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    //solo si no contiene la clase hidden
    closeModal();
    // document.querySelector(".modal").classList.add("hidden") //*classList para llamar las clases, no className
  }
});
