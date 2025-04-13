'use strict';
// const Person = function (firstName, birthYear) {
//   console.log(this);
//   //* Estas tambien son instancias
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   //*Never to this, afectaria al rendimiento acceder al constructor
//   //*Se tendria que crear una copia a cada objeto que instancia la clase
//   // this.calcAge = function(){
//   //     console.log(2017- this.birthYear)
//   // }
// };

// const jonas = new Person('Jonas', 1991); //*Se hace un constructor
// console.log(jonas);

// // 1. New {} es creado
// // 2. function is called, this = {}
// // 3. {} se vincula a un prototipo, esto establece el proto a la funcion que hace referencia
// // 4. la funcion returna el {}

// const matilda = new Person('Matilda', 2017);
// const jack = new Person('jack', 1975);

// /* Static methods */
// Person.hey = function () {
//   //*Solo le quotas el prototipo, lo pones dentro del mero constructor
//   console.log('Hey there 🫡');
//   console.log(this); //*Este si sera el constructor con las instance properties
// };
// Person.hey();

// //*La clase es como un prototipo que es las instrucciones para hacer la casa, y la instancia como un objeto que es lo que se hace con esas instrucciones
// console.log(matilda, jack);
// console.log(matilda instanceof Person); //*Si es una instancia de la clase, o en este caso el prototipo, retorna booleano

// //? Prototypes
// //*Todas las funciones tienen una propiedad llamada prototype

// console.log(Person.prototype); //*La manera de acceder a la clase
// //* prototype es acceder a la funcion constructora, asignar propiedades, solo una copia de la funcion, this es el {} inicial
// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// //*Se crea un objeto que hereda las propiedades de la funcion constructora
// jonas.calcAge(); //*Se accede aunque no exista dentro de la funcion en si
// matilda.calcAge();
// jack.calcAge();
// //*Cada objeto tiene acceso a metodos y propiedades de su prototipo

// console.log(jonas.__proto__); //*Acceso al prototipo del objeto creado del constructor, solo es el prototipo en si
// console.log(jonas.__proto__ === Person.prototype); //*Es lo mismo, porqque tiene acceso a sus props
// //*Person.prototype no es el prototipo de person, pero si el de todos los obj creados a partir de el

// console.log(Person.prototype.isPrototypeOf(jonas)); //*Booleano que lo confirma
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(Person));

// // prototype Of Link Objects

// Person.prototype.species = 'Homo Sapiens';
// console.log(jonas, matilda); //*estara la propiedad en el prototipo
// console.log(jonas.species, matilda.species);
// //*No estan directamente en el objeto, solo las own properties que son declaradas en el objeto en si, no las heredadas
// console.log(jonas.hasOwnProperty('firstName')); //*Manera de chequear si estan en las props declaradas del constructor
// console.log(jonas.hasOwnProperty('species')); //*falso porque no esta en el objeto en si, sino dentro del prototipo

// //? Prototypal inheritance on Built-In Objects
// console.log(jonas.__proto__.__proto__); //*Este es el final del alcance de prototype

// console.log(jonas.__proto__.__proto__.__proto__);
// console.dir(Person.prototype.constructor); //*Funcion constructora, console.dir permite inspeccionar objetos de una forma mas detallada, mostrando sus propiedades y estructuras internas de manera organizada y expandible

// const arr = [3, 4, 5, 6, 6, 8, 8, 9]; //* new Array === []
// console.log(arr.__proto__); //*Prototipo del array, todos lso metodos de la clase, hereda los metodos del prototipo
// console.log(arr.__proto__ === Array.prototype);
// console.log(arr.__proto__.__proto__); //*El prototipo del constructor

// Array.prototype.unique = function () {
//   return [...new Set(this)]; //*Tener todos los valores que sean unicos y retornar un arreglo
// };

// console.log(arr.unique()); //* Todos los arrays heredan esa funcion, igualmente no usarlo

// const h1 = document.querySelector('h1');
// console.dir(h1); //*El objeto con todos los metodos heredados del prototype
// console.dir(x => x + 1); //*Object.entries, keys, todos los metodos

// //? Codding Challenge #7
// /*
// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h

// GOOD LUCK 😀
// */

// const Car = function (make, speed = 0) {
//   this.make = make;
//   this.speed = speed;
// };

// const BMW = new Car('BMW', 120);
// const Mercedes = new Car('Mercedes', 95);

// const options = {
//   style: 'unit',
//   unit: 'kilometer-per-hour',
//   unitDisplay: 'short',
// };
// Car.prototype.accelerate = function () {
//   this.speed += 10;

//   const speedSeted = new Intl.NumberFormat(navigator.language, options).format(
//     this.speed
//   );
//   console.log(`The new speed of accelerate the ${this.make} is: ${speedSeted}`);
// };

// Car.prototype.brake = function () {
//   if (this.speed > 0) this.speed -= 5;
//   const speedSeted = new Intl.NumberFormat(navigator.language, options).format(
//     this.speed
//   );
//   console.log(`The new speed of brake the ${this.make} is: ${speedSeted}`);
// };

// BMW.accelerate();
// BMW.accelerate();
// BMW.brake();
// BMW.brake();
// Mercedes.accelerate();
// Mercedes.accelerate();
// Mercedes.brake();
// Mercedes.brake();

// //? ES6 Classes

// //* Class expression
// /* const PersonCl = class{

// } */

// //* Class declaration
// class PersonCl {
//   //*Se definen los planos, o sea la info a que sera igual, siempre que se establezca el nombre, solo se ejecuta cuando se manda a llamar ese dato
//   constructor(fullName, birthYear) {
//     (this.fullName = fullName), (this.birthYear = birthYear);
//   }

//   //*Aqui se pueden hacer los metodos d1
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   //*Es lo mismo que abajo
//   greet() {
//     console.log(`Hey ${this.firstName}`);
//   }

//   get age() {
//     return 2037 - this.birthYear;
//   }
//   //* Aqui solo se usa la palabra static al inicio, prepend
//   static hey() {
//     console.log('Hey 🫡');
//     console.log(this);
//   }

//   //*Esto pasa cuando tratamos de establecer/setear una propiedad que YA existe
//   //*El constyructor y el seter tratan de establecer el nombre completo porque se ejecuta
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     //* Como solucion se crea una nueva propiedad con un "_", ahora se reenombra el fullName a eso
//     //*se establecera como unica propiedad el _, por ello el get que retorna el _fullName
//     else alert(`${name} is not a full name`);
//   }

//   get fullName() {
//     return this._fullName; //*Ahora existen ambas, cada que se declaren
//   }
// }

// const walter = new PersonCl('Walter White', 1965); //*Si lo chequeamos solo tendra el birthYear

// const jessica = new PersonCl('Jessica Davis', 1996);
// console.log(jessica); //{objeto constructor con propiedades heredadas}, esta dentro del prototipo
// // jessica.calcAge();
// console.log('get age', jessica.age);
// // console.log(jessica.__proto__ === PersonCl.prototype); //*Recordar que es el prototipo de las instancias heredadas

// /* PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// }; */

// jessica.greet();

// // 1. Las clases no se elevan, //*O sea que si se elevan podriamos usarlas antes que se definan, como las funciones, cosa que NO HACEN
// // 2. CLasses are first-class citizens //*Podemos usarlas en funciones y retornalas de funciones, son funciones especiales debajo de escena
// // 3. Classes are executed in strict mode //* Aunque no usemos el "use-strict"
// //* Ambas formas de crear clases y prototipos estan BIEN, es preferencia personal
// //* Se pueden usar siempre y cuando se entiendan, la clase que es el plano se declaran sus valores a usar en el constructor al inicio, y luego se pasan las funciones que haran uso de ella, para luego ser parte de los metodos de las instancias que tengan info real

// class CarRun {
//   constructor(car, model, kilometer) {
//     this.car = car;
//     this.model = model;
//     this.kilometer = kilometer;
//   }

//   calcImp() {
//     const velocity = new Intl.NumberFormat('es-HN', {
//       style: 'unit',
//       unit: 'mile-per-hour',
//       unitDisplay: 'short',
//     }).format(String(this.kilometer));
//     console.log(
//       `the car ${this.car} is model of ${this.model} at speed of ${velocity}`
//     );
//   }
// }

// const ferrari = new CarRun('Ferrari', 'FXX Evo', 125);
// ferrari.calcImp();

// function uniqueId(number = 10000000) {
//   return Math.trunc(Math.random() * number) + 1;
// }

// const objetosuma = {
//   d1: uniqueId(),
//   d2: uniqueId(),
// };
// console.dir(objetosuma);

// //? Setters and Getters, establecimiento y obtencion
// //* getters y setters son funciones que obtienen y establecen un valor, como lo dice el nombre, aunque se ven como propiedades normales
// //? Assesors properties, y las normales son data properties

// const account = {
//   owner: 'Jonas',
//   movements: [200, 530, 120, 300],
//   //*Slice retorna array con la ultima posicion, pop para eliminar y retornar el ultimo valor
//   get latest() {
//     //*Se puede usar sin ejecutar la funcion
//     return this.movements.slice(-1).pop();
//   },

//   set latest(movement) {
//     //*si o si necesita un parametro
//     //*Inserta
//     this.movements.unshift(movement);
//   },
//   //*No es obligatorio especificar un setter para un getter de la misma propiedad
// };
// console.log(account.latest);
// console.log((account.latest = 50)); //*para llamarlo se establece el valor de la propiedad, como si fuera una propiedad normal
// console.log(account.movements);

// // console.log((walter.fullName = 'Walter Whiteoo')); //*En caso no sea, se manda eso primero porque esta arriba, pero luego se sustituye por esta propiedad

// //? Static Methods
// const nuevoPrueba = Array.from({ length: 7 }, (v = 0, i) => {
//   return (v = i + 1);
// });
// console.log(nuevoPrueba);

// console.log(Array.from(document.querySelectorAll('h1'))); //*Transforma en arrays, from esta adjuntado al constructor, no al prototipo, no a los obj
// //*Esta en el namespace
// console.info(Number.parseFloat('1.25px')); //*Metodos estaticos estan solo en el consturctor, no en las instancias funciones que se usan a partir de
// PersonCl.hey();

// //? Object.create, manera diferente de crear clases => funciones que reutilicen propiedades y metodos, herencia de prototipos
/* const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); //* Para atachar un nuevo objeto vacio a la funcion
steven.firstName = 'Steven';
steven.birthYear = 2002;
steven.calcAge(); */
// //*Cuando hacemos new establecemos el prototipo de ese constructor a los objetos que declaramos mediante la funcion new Constructor()
// //* De la otra manera lo hacemos manual

// console.log(steven.__proto__ === PersonProto); //* sera el mismo porque le dijimos explicitamente que sera el prototipo de Steven
// const sara = Object.create(PersonProto);
// sara.init('Saraj', 1979); //*Aqui se establece como si fuera una instancia pero no es lo mismo pq no se usa new
// sara.calcAge();

// //TODO Codding Challenge #2
// /*
// 1. Re-create challenge 1, but this time using an ES6 class;
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
// 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

// DATA CAR 1: 'Ford' going at 120 km/h

// GOOD LUCK 😀
// */

// class CarEnhanced {
//   constructor(car, speed) {
//     this.car = car;
//     this.speed = speed;
//   }
//   accelerate() {
//     this.speed += 10;

//     const speedSeted = new Intl.NumberFormat(
//       navigator.language,
//       options
//     ).format(this.speed);
//     console.log(
//       `The new speed of accelerate the ${this.car} is: ${speedSeted}`
//     );
//   };

//   brake() {
//     if (this.speed > 0) this.speed -= 5;
//     const speedSeted = new Intl.NumberFormat(
//       navigator.language,
//       options
//     ).format(this.speed);
//     console.log(`The new speed of brake the ${this.car} is: ${speedSeted}`);
//   }

//   /* getter Challenge */
//   get speedUS() {
//     const divideiton = new Intl.NumberFormat(navigator.language, {
//       style: 'unit',
//       unit: 'mile-per-hour',
//       unitDisplay: 'short',
//     }).format(`${Number.parseFloat(this.speed) / 1.6}`);
//     this.speed = divideiton;
//     console.log(`The new speed in miles/hour divided by 1.6 is ${divideiton}`);
//     return divideiton
//   }

//   set speedUS(speed) {
//     this.speed = new Intl.NumberFormat(navigator.language, {
//       style: 'unit',
//       unit: 'kilometer-per-hour',
//       unitDisplay: 'short',
//     }).format(Number.parseFloat(speed) * 1.6);
//     console.log(`The new reConverted unit is ${this.speed}`);
//     return this.speed
//   }
// }
// const Ford = new CarEnhanced('Ford', 120);
// Ford.accelerate();
// Ford.accelerate();
// Ford.brake();
// Ford.brake();
// Ford.speedUS
// Ford.speedUS = 120;
// console.log(Ford) //*Mostrara la propiedad ya seteada

// //? Inheritance Between classes, constructor functions, herencia entre clases

// console.log( new Date('12 december 1969')  )

/* const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
//!
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
//!
//*Aqui no se instancia, solo se copian las propiedades para no hacer doble trabajo
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};
//*Siempre se hace antes, sino se sobre escribirian los metodos, y se borraran
Student.prototype = Object.create(Person.prototype); //*Este metodo create SIEMPRE devolvera un objeto vacio
//*El prototipo de los hijos del estudiante seria igual al prototipo de los hijos de la persona

//*Que el person.prototype sea el prototipo del estudiante, que los hijos de esten hereden las propiedades

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const mike = new Student('Mike', 2020, 'Computer Science');

//* No se debe de violar el principio de no repeticion
//*Y en las llamadas a funciones, la keyword 'this' es undefined, por ello existe el metodo bind
// console.log(mike.__proto__);
mike.introduce();
mike.calcAge(); //*ya habiendo heredado los hijos de person

console.log(mike instanceof Student); //* Tiene que apuntar a la funcion constructora
console.log(mike instanceof Object); //* Tiene que apuntar a la funcion constructora
console.log(mike instanceof Person); //* Tiene que apuntar a la funcion constructora

Student.prototype.constructor = Student; //*La funcion constructora del estudiante deberia ser estudiante
console.dir(mike); //*Ahora sera el person, que el estudiante establecio como igual, porque el estudiante no es una instancia, sino una funcion constructora, el segundo nivel si tiene calcAge()
console.dir(Student.prototype.constructor); //*esta apuntando a persona */

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
/* const options = {
  style: 'unit',
  unit: 'kilometer-per-hour',
  unitDisplay: 'short',
};
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.brake = function () {
  if (this.speed > 0) this.speed -= 5;
  const speedSeted = new Intl.NumberFormat(navigator.language, options).format(
    this.speed
  );
  console.log(`The new speed of brake the ${this.make} is: ${speedSeted}`);
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  const speedSeted = new Intl.NumberFormat(navigator.language, options).format(
    this.speed
  );
  console.log(`The new speed of accelerate the ${this.make} is: ${speedSeted}`);
};
const BMW = new Car('BMW', 135);
const EV = function (make, speed, charge) {
  Car.call(this, make, speed); //*Aqui se declara que hereda propiedades, en lugar de definirlas dos veces
  this.charge = charge;
};
//*Link the ptorotypes, que herede los metodos, pero se le permitan añadir, como un {...Car.proto, methodUnique}
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`The new charge is ${this.charge}%`);
};
//*Aqui se muestra el polimorfismo, ya que se usa una propiedad que en car no existe, si car tuviera este metodo, no tendria charge
//*Si no se creara, tomaria el mas lejano
//! Definicion de polimorfismo, se usa un mismo metodo, para darle varios usos mas personalizados
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--; //* this.charge = this.charge -1
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const Tesla = new EV('Tesla', 120, 23);
Tesla.accelerate(); //* Tiene dos accelerate methods, pero agarra el mas cercano, se puede "sobreescribir" un objeto heredado de child from the parent class
Tesla.brake();
Tesla.chargeBattery(90);
Tesla.accelerate();
BMW.accelerate(); //*Al ser funcion, obj creado a partir del constructor Car, tene acceso a accelerate, y busca el prototype chain mas cercano */

//? Inhiterance Between "Classes": ES6 Classes
/* class PersonCl {
  constructor(fullName, birthYear) {
    (this.fullName = fullName), (this.birthYear = birthYear);
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }
  //* Aqui solo se usa la palabra static al inicio, prepend
  static hey() {
    console.log('Hey 🫡');
    console.log(this);
  }

  //*Esto pasa cuando tratamos de establecer/setear una propiedad que YA existe
  //*El constyructor y el seter tratan de establecer el nombre completo porque se ejecuta
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    //* Como solucion se crea una nueva propiedad con un "_", ahora se reenombra el fullName a eso
    //*se establecera como unica propiedad el _, por ello el get que retorna el _fullName
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName; //*Ahora existen ambas, cada que se declaren
  } //*sobreescribe el nombre de la propiedad
}
//*vinculara ambos, StucendtCl es el hijo de PersonCl
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //*No se ocupa el call, en vez del call
    // Always needs to happen first
    super(fullName, birthYear); //*para pasar los argumentos del this, crea la THIS
    this.course = course; //*si no se quisiera, ni se necesitaria la constructora, super haria el trabajo de pasar args y {}
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
  calcAge() { //*se llamara primero este que el del parent
    console.log(
      `Im ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

// const martha = new StudentCl('Marhtha Jones', 2012); //*Aun sin el constructor ya hereda las propiedades
const martha = new StudentCl('Marhtha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge(); //*hereda los metodos
//*Esto puede ser problematico cuando se hace software programming, eso se vera en la programacion funcional, alternativa a la OOP */

//? Inhiterance Between "Classes": Object.create
/* const PersonProto = {
  //*Es el prototipo
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const Steven = Object.create(PersonProto); //*crea un nuevo objeto, suele ser el prototipo con las props y metodos, Steven.__proto__

const StudentProto = Object.create(PersonProto); //*toma el objeto proto
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto); //*{} nada porque el proto esta vacio
jay.init('Jay', 2010, 'Computer Science'); //*Se establecen los valores, ahora le obj jay no esta vacio
jay.introduce(); */

//? Another Class Example
//? Encapsulation Private Class Fields and Methods
// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)

class Account {
  // 1) Public fields (instances) esaran en las instancias
  locale = navigator.language; //*parece como declarar una const pero sin, y ocupa ; al final, el this se hace behind the scences

  // 2) Private fields (instances) no en el prototype
  #movements = []; //*esto es para hacerlo privado, solo se podra usar dentro de la clase, para metodos etc
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner; //*Ya no estan en el prototype
    this.currency = currency;
    //* Propiedad protegida
    this.#pin = pin; //*Aqui solo lo usamos cuando creamos el objeto, instancia a partir del constructor clase
    // this._movements = []; //*no queremos pasar un array vacio a todas, sin ninguna entrada
    // this.locale = navigator.language; //*Propiedades que queremos estaticas, iguales en todos

    console.log(`Thanks for opening an accoun, ${owner}`); //*se puede poner un cl en el constructor
  }

  // 3) Public methods Todos estos
  //* Public interface
  getMovements() {
    //* Get falso para obtener el valor publicamente
    return this.#movements; //*en get solo seria acc.getMovement
  }

  deposit(val) {
    //*Esto tambien es una Api
    this.#movements.push(val);
    return this; //* El objeto actual
  }

  withdraw(val) {
    //*Se simplifica algo complejo mostrando solo lo escencia, Abstraccion
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  static helper() {
    console.log('Helper'); //*Solo funcionan en la clase
  }

  // 4) Private methods, para ocultar detalles de implementacion desde el exterior, solo usarlo dentro de la clase,
  // Se puede usar el _ como convencion, pero solo es una capa falsa
  #approveLoan(val) {
    //*Lo mismo con metodos, se retorna en una prop llamada asi
    return true;
  }
}
const acc1 = new Account('Jonas', 'EUR', 1111);
const jon = new Account('Jon', 'DOLLAR', 2222);
console.log(acc1);

// acc1.movements.push(250); //*Esto no se hace ya que puede modificar el incial y traer errores
// acc1.movements.push(-140);
// acc1._movements.push(-140); // Todavia se puede hacer esto
acc1.deposit(250); //*Si queremos ver el pin podemos por lo que es necesario Encapsular
acc1.withdraw(140);
acc1.requestLoan(1000);
acc1.getMovements(); //*Usamos los metodos que privadamente usan la prop privada
console.log(acc1);
console.log(Account);
// Account.hola() //*Solo sera accesible POR EL CONSTRUCTOR
//*En otros lenguajes, las propiedades se suelen llamar Fields o "Campos"

Account.helper(); //*Se necesita devolver el objeto para volver a acceder a los metodos
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

//? Challenge #4
/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  options = {
    //*Es gloal y en los hijos tambien
    style: 'unit',
    unit: 'kilometer-per-hour',
    unitDisplay: 'short',
  };

  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  brake() {
    if (this.speed > 0) this.speed -= 5;
    const speedSeted = new Intl.NumberFormat(
      navigator.language,
      this.options
    ).format(this.speed);
    console.log(`The new speed of brake the ${this.make} is: ${speedSeted}`);
    return this;
  }

  accelerate() {
    this.speed += 10;
    const speedSeted = new Intl.NumberFormat(
      navigator.language,
      this.options
    ).format(this.speed);
    console.log(
      `The new speed of accelerate the ${this.make} is: ${speedSeted}`
    );
  }

  get speed() {
    const divideiton = new Intl.NumberFormat(navigator.language, {
      style: 'unit',
      unit: 'mile-per-hour',
      unitDisplay: 'short',
    }).format(`${Number.parseFloat(this._speed) / 1.6}`);
    this._speed = divideiton;
    console.log(`The new speed in miles/hour divided by 1.6 is ${divideiton}`);
    return divideiton;
  }

  set speed(speed) {
    //*Si se llaman igual se sobreescribiran, pero sino estaran en armonia
    this._speed = new Intl.NumberFormat(navigator.language, {
      style: 'unit',
      unit: 'kilometer-per-hour',
      unitDisplay: 'short',
    }).format(Number.parseFloat(speed) * 1.6);
    console.log(`The new reConverted unit is ${this._speed}`);
    return this._speed;
  }
}

class EVCL extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(charge) {
    this.#charge = charge;
    console.log(`The new charge is ${this.#charge}%`);
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--; //* this.charge = this.charge -1
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const Rivian = new EVCL('Rivian', 120, 23);
Rivian.brake().accelerate().chargeBattery(90); //*En cada metodo se devuelve el objeto {} creado, para volverlo.().a().llamar()
console.log(Rivian.speed);
console.log(Rivian);
console.log((Rivian.speed = 150)); //*Existen ambas
console.log(Rivian);
