'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//* Se definen variables globales que luego serán iguales a lo que se les asigne, eventos o instancias

//? Refactoring for Project Architecture

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10); //*El id serán los últimos 10 dígitos de la fecha
  clicks = 0;

  constructor(coords, distance, duration) {
    //this.date =...
    //this.id=...
    this.coords = coords; // [lat, lng]
    this.distance = distance; //in km
    this.duration = duration; //in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription(); //*cuando son clases privadas, se debe declarar aquí para tener acceso a ellas, ya que están protegidas por el scope chain
  }

  calcPace() {
    //*Ritmo
    // min/km
    this.pace = this.duration / this.distance; //*Se define una propiedad calculando los valores propuestos
    return this.pace; //*Por si se quiere concatenar
  }
}
class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain; //m
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60); //*Ya que es en horas
    this.speed;
  }
}

const run1 = new Running([39, -12], 5.2, 24, 178);
const cycling = new Cycling([39, -12], 27, 95, 523);

///////////////////////////
// APLICATION ARCHITECTURE
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];
  //*constructor se llama cuando se crea la instancia, cuando la page loads
  constructor() {
    // Get users position
    this._getPosition(); //*Se ejecutara justo al cargar la pagina

    // Get data from local storage
    this._getLocalStorage();

    // Attach event handlers
    //*en un aEL, la this keyword va a apuntar al form, elemento
    form.addEventListener('submit', this._newWorkout.bind(this));

    //*Escuchamos el evento cuando cambia un valor en el "form__input--type", funciona cuando solo son dos
    inputType.addEventListener('change', this._toggleElevationField);

    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    //? Using the Geolocation API
    if (navigator.geolocation) {
      //*el aEL lo llama como una función normal con this indefinido, asi que lo vinculamos al this de la clase
      //*bind se asegura que el this de una función nunca se pierda
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
    }
  }

  _loadMap(position) {
    const {
      coords: { latitude, longitude },
    } = position;

    //*El enlace se confirma de maps, @latitude, longitude
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    this.#map = L.map('map').setView([latitude, longitude], this.#mapZoomLevel);

    //*on se usara en lugar de aEL, porque se ocupa manejar la ubicacion
    //*titleLayer agrega el sistema de capas al mapa
    L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //*Handling clicks on map, en este caso el "this", seria el mapa xd
    this.#map.on('click', this._showForm.bind(this));

    //*Se llama aqui porque espera a que cargue
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus(); //*para poner foco en este elemento
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    //*Con spread en function dará un arreglo
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp)); //*retorna true si la condición es true en todos, sino dará falso
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    // Display marker
    e.preventDefault();

    // Get data from form
    const type = inputType.value; //*Aunque sea un select, obtenemos la propiedad de un value
    const distance = +inputDistance.value; //*vienen en strings, convertir a numero
    const duration = +inputDuration.value;
    const {
      latlng: { lat, lng },
    } = this.#mapEvent;
    let workout;

    //Check if data is valid

    //If workout running. create running object
    if (type === 'running') {
      // Check if data is valid
      const cadence = +inputCadence.value;
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration)
      )
        //*Si es falsa la condición pues
        //*Si no es un numero
        return alert('inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    //If workout cycling. create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value; //*Puede ser negativa si se va abajo etc
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    //Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form + clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();

    // console.log(this.#mapEvent); //*Se activa cuando le damos click a map
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    //* Usamos el id como un puente entre la interfaz y la información que ponemos
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;

    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;

    form.insertAdjacentHTML('afterend', html);
  }

  _hideForm() {
    // Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout'); //*por defecto da nulo, y si no hay un elemento asi

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id //*Como esta dentro del data usar dataset "data-id"
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface
    // workout.click();
  }

  //* localStorage API, JSON stringify convierte cualquier objeto de JS en una cadena
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  //? Cuando se convierten objetos a strings y luego a obj, se pierde el alcance de prototipos

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data; //*Que el almacén sea igual al array inicial
    //! Esto se ejecuta al inicio

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  reset(){
    localStorage.removeItem("workouts")
    location.reload()
  }
}

//* En la consola del navegador también se pueden ver
const app = new App();

//? Final Considerations
//* Habilidad de editar un workout
//* Habilidad de eliminar un workout
//* Habilidad de eliminar todos los workouts desde la interfaz de usuario
//* ordenar los entrenamientos por distancia, duración, etc.
//* Reconstruir los objetos que provienen del localStorage
//* Crear mensajes de confirmación y error mas realistas

// Difíciles
//* Posicionar el mapa para que muestre todos los workouts
//* Dibujar lineas y figuras en lugar de solo puntos

//* Poder geocodificar la ubicación a partir de las coordenadas, ("Corriendo en Faro, Portugal") API
//* Desplegar el clima para la hora y el lugar del ejercicio API