// assicurarsi di aver installato TypeScript con:
// npm i -g typescript
// assicurarsi che risponda correttamente ad una richiesta di versione (vorrà dire che è installato correttamente)
// tsc -v
// risponderà con un numero di versione

// possiamo avviare questo file con il comando:
// tsc script.ts
// oppure
// tsc script.ts -w
// la w tiene attivo il processo che farà il "watch" del file, ovvero, riavverà la compilazione ad ogni modifica o salvataggio

console.log("Hello TypeScript!");

// In TypeScript nel caso in cui creassimo variabili semplici come questa, è consigliabile NON specificare il tipo manualmente,
// perché TS è già in grado di ricavarlo per INFERENZA

// let myName: string = "Stefano";
let myName = "Stefano"; // TS ha già assegnato "silenziosamente" il tipo string alla nostra variabile
myName = "Luciano"; // questo sarà permesso
// myName = 10; // dà errore in quanto sono permesse solo stringhe

let emptyVar; // tipo any associato di default (male!)

emptyVar = 50;
emptyVar = null;
emptyVar = "Ciao";

// una volta assegnato un tipo, questo rimane applicato per sempre.
// In questo caso non avendo potuto INFERIRE il tipo da un valore applicato al momento dell'inizializzazione della variabile,
// TS ha applicato in automatico il tipo "any".
// Da quel momento in poi tutto è permesso, e NON VA BENE!

let myVar: number; // assegno io il tipo numero
// mi potrà accettare valori numerici

myVar = 100; // accettato
// myVar = "Stefano" // genera errore

console.log(myName.toUpperCase()); // metodi disponibili sulle stringhe
console.log(myVar.toString()); // metodi disponibili sui numeri

// quali sono i tipi disponibili?

// TIPI PRIMITIVI

// string
// number
// boolean
// null
// undefined

// tipi particolari che si aggiungono in TS

// any - da evitare il più possibile (se capita di usarlo, bisogna cercare di sostituirlo con il tipo corretto il prima possibile)
//       può venire assegnato in automatico con creazioni di variabili o parametri vuoti (in quel caso interveniamo noi con assegnazioni manuali)
// never - un tipo che verrà assegnato in determinate situazioni di valori ancora inesistenti o mai ritornati (es. da funzioni che lanciano errori e non tornano nulla)
// unknown - un tipo simile ad any, ma che può cambiare accezione in base al contesto di utilizzo del dato.
// void - indica ad esempio una funzione senza valore di ritorno (senza una keyword return)

// tipi strutturali - ognuno di loro ha la sua rapprentazione per specificare la forma del dato

// Object
// Array
// Function

let userName: string = "Stefano";

// FUNZIONI

const sayHello: () => string = function () {
  return "hello TypeScript";
};

console.log(sayHello().toLowerCase()); // TS saprà esattamente qual è il tipo del valore in uscita dalla funzione, e mi suggerirà, ancora una volta,
//  i metodi corretti e disponibili per quel dato

// parametri che non specificano il tipo avranno un tipo implicito "any"
const addition = (n1, n2) => {
  if (typeof n1 === "number" && typeof n2 === "number") {
    return n1 + n2;
  } else {
    return "non hai passato due numeri";
  }
};

console.log(addition(2, 3));
console.log(addition("2", "3")); // non essendo specificati i tipi dei dati in ingresso (parametri) è permesso di passare qualsiasi dato come argomento
// e sarà poi onere nostro gestire il codice all'interno della funzione

// in questo caso, invece, andando preventivamente a dichiarare il tipo di dato ammissibile in input (parametri) non saranno ammessi valori diversi da quelli impostati
const additionWithTS = (n1: number, n2: number) => {
  return (n1 + n2).toString();
};

additionWithTS(3, 2);
// additionWithTS("1", 2); // errore sul primo argomento

// TYPE UNION - unione di due o più tipi assegnabili ad un qualche contenitore di valore (variabili, parametri, proprietà di oggetto, elementi di array)

let whatever: string | boolean;

if (4 < 8) {
  whatever = "stefano";
  whatever.substring(0, 2);
} else {
  whatever = false;
}

// quando usiamo la type union, TS diventa molto più stringente sulle operazioni permesse

// whatever.substring(0, 1) // non mi farà utilizzare il metodo substring, per via dell'eventualità che whatever POSSA essere
// booleano in un qualche momento nel tempo

// noi sapevamo che quel controllo 4<8 avrebbe SEMPRE dato true, ma TS non può saperlo in anticipo
// possiamo però rassicuralo creando un nuovo controllo che indichi con assoluta certezza che in quel contesto abbiamo a che fare con una stringa
if (typeof whatever === "string") {
  whatever.substring(0, 1);
  // non c'è modo di entrare qui dentro senza che whatever non sia con assoluta certezza una stringa, quindi TS non si lamenterà più
}

// possiamo rassicurarlo anche in questo modo: convertendo il tipo associato alla varibile che di conseguenza ci permetterà un utilizzo specifico per stringa
// TYPE CASTING "as"
(whatever as string).substring(0, 1);

// il tipo unknown - è l'unico "flessibile", può venire associato e quest'associazione può fargli "agganciare" un nuovo tipo

let maybe: unknown;

if (maybe === true) {
  const myBoolean = maybe;
}

if (typeof maybe === "string") {
  const myString = maybe;
}

// TIPI LETTERALI - ovvero limitare la possibilità di valori a degli elementi definiti in precedenza

type Variants = "primary" | "secondary" | "warning" | "danger" | "success";

const myVariant: Variants = "primary";
const myVariant2: Variants = "danger";
// const myVariant3: Variants = "tertiary";

// CUSTOM TYPE (o TYPE ALIAS) - è un contenitore di tipi solitamente composti
// si definisce con la keyword "type"

type StringOrNumber = string | number;
// un contenitore di tipo può essere assegnato come valore di tipo a qualsiasi contenitore

// per esempio ai parametri di una funzinoe
const mixedParams = (par1: StringOrNumber, par2: StringOrNumber) => {
  // un parametro ambiguo dovrà essere gestito in maniera più particolareggiata per togliere ambiguità al segno +
  if (typeof par1 === "number" && typeof par2 === "number") {
    return par1 + par2;
  } else {
    return (par1 as string) + (par2 as string);
  }
};

console.log(mixedParams(1, 2));
console.log(mixedParams("3", "4"));

// lo stesso contenitore di tipo (TYPE ALIAS) può essere usato in diversi contesti
let doubleValues: StringOrNumber;
doubleValues = "Hello";
doubleValues = 66;

// ARRAY

const myNeverArray = []; // never[]
// un array di never è un array che non avrà mai elementi, quindi NON sarà possibile inserirgliene a posteriori
// myArray.push("2");
// myArray.push(1);

// per evitare l'INFERENZA scorretta del dato interno ad un qualsiasi array che andiamo a creare vuoto per poi riempirlo successivamente,
// andremo a specificare noi il tipo dell'array e dei suoi elementi interni
const myNumbersArr: number[] = [];
myNumbersArr.push(10);
myNumbersArr.push(0);
myNumbersArr.push(2);
// myNumbersArr.push("stefano") // non è ammesso l'inserimento di una stringa

myNumbersArr.forEach(n => n.toFixed(0));

const myStringArr: string[] = [];
myStringArr.push("1");
myStringArr.push("2");
myStringArr.push("3");

myStringArr.forEach(s => s.concat("!"));

const myMixedArr: (string | undefined)[] = [];

// myMixedArr.push(true);
myMixedArr.push("hola");
myMixedArr.push(undefined); // undefined non è ammesso

// per il fatto che el QUALCHE VOLTA potrebbe essere undefined vscode applica un optional chaining operator,
// che eviterà di applicare qualsiasi cosa successiva al ? nel caso in cui il dato sia falsy

// lo slice verrà fatto SOLO su typeof el === "string", ci permette di verificare l'esistenza del dato prima del suo corretto utilizzo
myMixedArr.forEach(el => el?.slice());

const myMixedArr2: StringOrNumber[] = [];
myMixedArr2.push(200);
myMixedArr2.push("Ciao");
// myMixedArr2.push(null); // null non è ammesso

myMixedArr2.forEach(el => el.toString());

// TUPLA - una tupla è una sorta di array con posizioni specifiche con tipi specifici associati alle posizioni
const myTuple: [number, string] = [0, "1"];
// const first = myTuple[0]
// const second = myTuple[1]

const [first, second] = myTuple;

const myTuple2: [number, string, boolean] = [0, "Ciao", true];

// ogni posizione è associata ad un tipo ed il loro utilizzo sarà fissato sui metodi disponibili per quel tipo di dato:
myTuple2[0].toFixed();
myTuple2[1].charAt(0);
myTuple2[2].valueOf();

// OGGETTI
// dichiarare un oggetto dentro una variabile, come per altri dati, farà inferire il "tipo oggetto" in automatico
const dog = {
  name: "fuffy",
  age: 2
};

// farglielo inferire automaticamente però non ci dà nessuna sicuressa correttezza dei dati o sull'omogeneità degli stessi nel tempo
//  (tra un dato e l'altro che dovrebbe contenere lo stesso oggetto)

// applicare però il tipo oggetto su tutte le istanze crea un po' di rumore, risolvibile creando un type alias

// const teacher: { name: string; surname: string; teaching: boolean; batchCode: string } = {
//   name: "Stefano",
//   surname: "Miceli",
//   teaching: true,
//   batchCode: "FS0225"
// };

type Person = { name: string; surname: string; age: number; address?: string };

type Teacher = { teaching: boolean; batchCode: string; webcamOn?: boolean };

// UNIONE DI DUE O PIU' TIPI
const teacher: Person & Teacher = {
  name: "Stefano",
  surname: "Miceli",
  age: 35,
  teaching: true,
  batchCode: "FS0225",
  address: "via delle rose 55", // questa proprietà è facoltativa
  webcamOn: true // questa proprietà è facoltativa, non la troviamo sul prossimo oggetto perché nella sua definizione si è utilizzato il ? (questo la rende facoltativa)
};

const teacher2: Person & Teacher = {
  name: "Stefano",
  surname: "Casasola",
  age: 37,
  teaching: false,
  batchCode: "FS0125"
};

teacher.age.toFixed(0);
teacher2.surname.toUpperCase();

// INTERFACES - come per i TYPE ALIAS sono contenitori di definizione di tipi per gli oggetti

// si definisce con keyword "interface"

interface HumanBeing {
  name: string;
  surname: string;
  numberOfEyes?: number;
  numberOfArms?: number;
  // height: number | string
  height: StringOrNumber;
  hairColor: string;
}

const person: HumanBeing = {
  name: "Mario",
  surname: "Rossi",
  numberOfEyes: 2, // facoltativa
  height: 190,
  hairColor: "brown"
};

interface EpicodeStudent extends HumanBeing {
  batchCode: string;
  hasWebcam: boolean;
  preferredTopic?: "HTML" | "CSS" | "JavaScript" | "SASS" | "Bootstrap" | "React" | "TypeScript";
}

const student: EpicodeStudent = {
  name: "Antonio",
  surname: "Taldeitali",
  numberOfArms: 2,
  numberOfEyes: 2,
  height: 180,
  hairColor: "gray",
  batchCode: "FS0124",
  hasWebcam: false,
  preferredTopic: "JavaScript"
};

const student2: EpicodeStudent = {
  name: "Nicolae",
  surname: "Loboda",
  numberOfArms: 2,
  numberOfEyes: 2,
  height: 180,
  hairColor: "black",
  batchCode: "FS0225",
  hasWebcam: true,
  preferredTopic: "JavaScript"
};

const student3: EpicodeStudent = {
  name: "Daniele",
  surname: "Russo",
  numberOfArms: 2,
  numberOfEyes: 2,
  height: 170,
  hairColor: "brown",
  batchCode: "FS0225",
  hasWebcam: true,
  preferredTopic: "React"
};

// const arrOfStudents2: Array<EpicodeStudent> = [];
const arrOfStudents: EpicodeStudent[] = [];

arrOfStudents.push(student);
arrOfStudents.push(student2);
arrOfStudents.push(student3);

arrOfStudents.forEach(stud => console.log(stud.name));

const arrOfStudNames = arrOfStudents.map(stud => stud.name);

// GENERICS
// sono "parametri di tipo" per un'interfaccia

// permette di non forzare a priori il tipo di un dato all'interno di una interfaccia resa "flessibile" dall'utilizzo di uno o più generics
// permette di decidere il tipo da associare nel momento dell'utilizzo di quell'interfaccia

interface Topic {
  weeklyTopic: string[];
}

interface EpicodeUnit<T> {
  name: string;
  assignedTeacher: string | string[];
  topic: T;
}

const U1: EpicodeUnit<string> = {
  name: "Unit1",
  assignedTeacher: "Stefano",
  topic: "HTML, CSS"
};

const U2: EpicodeUnit<string[]> = {
  name: "Unit2",
  assignedTeacher: ["Stefano Miceli", "Stefano Casasola"],
  topic: ["CSS ADV", "UX/UI", "Bootstrap", "SASS"]
};

const U3: EpicodeUnit<Topic[]> = {
  name: "Unit2",
  assignedTeacher: ["Stefano Miceli", "Stefano Casasola"],
  topic: [
    { weeklyTopic: ["React Intro", "State", "Props"] },
    { weeklyTopic: ["React Intermediate", "Lifecycle Methods", "Router", "Testing"] },
    { weeklyTopic: ["TypeScript", "TypeScript React", "Redux"] }
  ]
};
