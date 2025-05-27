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
var myName = "Stefano"; // TS ha già assegnato "silenziosamente" il tipo string alla nostra variabile
myName = "Luciano"; // questo sarà permesso
// myName = 10; // dà errore in quanto sono permesse solo stringhe
var emptyVar; // tipo any associato di default (male!)
emptyVar = 50;
emptyVar = null;
emptyVar = "Ciao";
// una volta assegnato un tipo, questo rimane applicato per sempre.
// In questo caso non avendo potuto INFERIRE il tipo da un valore applicato al momento dell'inizializzazione della variabile,
// TS ha applicato in automatico il tipo "any".
// Da quel momento in poi tutto è permesso, e NON VA BENE!
var myVar; // assegno io il tipo numero
// mi potrà accettare valori numerici
myVar = 100; // accettato
// myVar = "Stefano" // genera errore
console.log(myName.includes("Ste")); // metodi disponibili sulle stringhe
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
var userName = "Stefano";
// FUNZIONI
var sayHello = function () {
    return "hello TypeScript";
};
console.log(sayHello().toLowerCase()); // TS saprà esattamente qual è il tipo del valore in uscita dalla funzione, e mi suggerirà, ancora una volta,
//  i metodi corretti e disponibili per quel dato
// parametri che non specificano il tipo avranno un tipo implicito "any"
// const addition = (n1, n2) => {
//   if (typeof n1 === "number" && typeof n2 === "number") {
//     return n1 + n2;
//   } else {
//     return "non hai passato due numeri";
//   }
// };
// console.log(addition(2, 3));
// console.log(addition("2", "3")); // non essendo specificati i tipi dei dati in ingresso (parametri) è permesso di passare qualsiasi dato come argomento
// e sarà poi onere nostro gestire il codice all'interno della funzione
// in questo caso, invece, andando preventivamente a dichiarare il tipo di dato ammissibile in input (parametri) non saranno ammessi valori diversi da quelli impostati
var additionWithTS = function (n1, n2) {
    return (n1 + n2).toString();
};
additionWithTS(3, 2);
// additionWithTS("1", 2); // errore sul primo argomento
// TYPE UNION - unione di due o più tipi assegnabili ad un qualche contenitore di valore (variabili, parametri, proprietà di oggetto, elementi di array)
var whatever;
if (4 < 8) {
    whatever = "stefano";
    whatever.substring(0, 2);
}
else {
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
whatever.substring(0, 1);
// il tipo unknown - è l'unico "flessibile", può venire associato e quest'associazione può fargli "agganciare" un nuovo tipo
var maybe;
if (maybe === true) {
    var myBoolean = maybe;
}
if (typeof maybe === "string") {
    var myString = maybe;
}
var myVariant = "primary";
var myVariant2 = "danger";
// un contenitore di tipo può essere assegnato come valore di tipo a qualsiasi contenitore
// per esempio ai parametri di una funzinoe
var mixedParams = function (par1, par2) {
    // un parametro ambiguo dovrà essere gestito in maniera più particolareggiata per togliere ambiguità al segno +
    if (typeof par1 === "number" && typeof par2 === "number") {
        return par1 + par2;
    }
    else {
        return par1 + par2;
    }
};
console.log(mixedParams(1, 2));
console.log(mixedParams("3", "4"));
// lo stesso contenitore di tipo (TYPE ALIAS) può essere usato in diversi contesti
var doubleValues;
doubleValues = "Hello";
doubleValues = 66;
// ARRAY
var myNeverArray = []; // never[]
// un array di never è un array che non avrà mai elementi, quindi NON sarà possibile inserirgliene a posteriori
// myArray.push("2");
// myArray.push(1);
// per evitare l'INFERENZA scorretta del dato interno ad un qualsiasi array che andiamo a creare vuoto per poi riempirlo successivamente,
// andremo a specificare noi il tipo dell'array e dei suoi elementi interni
var myNumbersArr = [];
myNumbersArr.push(10);
myNumbersArr.push(0);
myNumbersArr.push(2);
// myNumbersArr.push("stefano") // non è ammesso l'inserimento di una stringa
myNumbersArr.forEach(function (n) { return n.toFixed(0); });
var myStringArr = [];
myStringArr.push("1");
myStringArr.push("2");
myStringArr.push("3");
myStringArr.forEach(function (s) { return s.concat("!"); });
var myMixedArr = [];
// myMixedArr.push(true);
myMixedArr.push("hola");
myMixedArr.push(undefined); // undefined non è ammesso
// per il fatto che el QUALCHE VOLTA potrebbe essere undefined vscode applica un optional chaining operator,
// che eviterà di applicare qualsiasi cosa successiva al ? nel caso in cui il dato sia falsy
// lo slice verrà fatto SOLO su typeof el === "string", ci permette di verificare l'esistenza del dato prima del suo corretto utilizzo
myMixedArr.forEach(function (el) { return el === null || el === void 0 ? void 0 : el.slice(); });
var myMixedArr2 = [];
myMixedArr2.push(200);
myMixedArr2.push("Ciao");
// myMixedArr2.push(null); // null non è ammesso
myMixedArr2.forEach(function (el) { return el.toString(); });
// TUPLA - una tupla è una sorta di array con posizioni specifiche con tipi specifici associati alle posizioni
var myTuple = [0, "1"];
// const first = myTuple[0]
// const second = myTuple[1]
var first = myTuple[0], second = myTuple[1];
var myTuple2 = [0, "Ciao", true];
// ogni posizione è associata ad un tipo ed il loro utilizzo sarà fissato sui metodi disponibili per quel tipo di dato:
myTuple2[0].toFixed();
myTuple2[1].charAt(0);
myTuple2[2].valueOf();
// OGGETTI
// dichiarare un oggetto dentro una variabile, come per altri dati, farà inferire il "tipo oggetto" in automatico
var dog = {
    name: "fuffy",
    age: 2
};
// UNIONE DI DUE O PIU' TIPI
var teacher = {
    name: "Stefano",
    surname: "Miceli",
    age: 35,
    teaching: true,
    batchCode: "FS0225",
    address: "via delle rose 55", // questa proprietà è facoltativa
    webcamOn: true // questa proprietà è facoltativa, non la troviamo sul prossimo oggetto perché nella sua definizione si è utilizzato il ? (questo la rende facoltativa)
};
var teacher2 = {
    name: "Stefano",
    surname: "Casasola",
    age: 37,
    teaching: false,
    batchCode: "FS0125"
};
teacher.age.toFixed(0);
teacher2.surname.toUpperCase();
var person = {
    name: "Mario",
    surname: "Rossi",
    numberOfEyes: 2, // facoltativa
    height: 190,
    hairColor: "brown"
};
var student = {
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
var student2 = {
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
var student3 = {
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
var arrOfStudents = [];
arrOfStudents.push(student);
arrOfStudents.push(student2);
arrOfStudents.push(student3);
arrOfStudents.forEach(function (stud) { return console.log(stud.name); });
var arrOfStudNames = arrOfStudents.map(function (stud) { return stud.name; });
var U1 = {
    name: "Unit1",
    assignedTeacher: "Stefano",
    topic: "HTML, CSS"
};
var U2 = {
    name: "Unit2",
    assignedTeacher: ["Stefano Miceli", "Stefano Casasola"],
    topic: ["CSS ADV", "UX/UI", "Bootstrap", "SASS"]
};
var U3 = {
    name: "Unit2",
    assignedTeacher: ["Stefano Miceli", "Stefano Casasola"],
    topic: [
        { weeklyTopic: ["React Intro", "State", "Props"] },
        { weeklyTopic: ["React Intermediate", "Lifecycle Methods", "Router", "Testing"] },
        { weeklyTopic: ["TypeScript", "TypeScript React", "Redux"] }
    ]
};
