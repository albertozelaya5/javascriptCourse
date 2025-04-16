
```
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
```
funcion.bind(this || obj) toggle, si no tenia la clase la ponia, y si la tenia la quitaba