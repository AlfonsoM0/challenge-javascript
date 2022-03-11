//#region //-NOTE: //? Archivo DS para usar  QUOKKA
/*
function Queue() {
    this._arr = [];
}

Queue.prototype.enqueue = function(val) {
    this._arr.push(val);
}

Queue.prototype.dequeue = function() {
    return this._arr.shift();
}

Queue.prototype.size = function() {
    return this._arr.length;
}

function LinkedList() {
    this._length = 0;
    this.head = null;
}

function Node(value){
    this.value = value;
    this.next = null;
}

LinkedList.prototype.add = function(value) {
    // Si el head no apuntara a nada (lista vacia)
    if (!this.head) {
        // Hago que el head apunte al nuevo nodo
        this.head = new Node(value);
        // retorno el nuevo largo
        return ++this._length;
    }
    // Si el head si apuntara a un nodo
    // Creo un cursor con el que recorrer la lista
    let cursor = this.head;
    // Mientras el cursor este apuntando a alguien
    while (cursor.next) {
        // Muevo el cursor al nodo apuntado
        cursor = cursor.next;
    }
    // Ahora que el cursor no apunta a otro nodo
    // Hago que el nodo del cursor apunte al nuevo nodo
    cursor.next = new Node(value);
    // retorno el nuevo largo
    return ++this._length;
}

LinkedList.prototype.remove = function(value) {
    // Si el head no apuntara a nada (lista vacia) retorno null
    if (!this.head) return null;
    // Si el head apuntara a un unico nodo
    if (!this.head.next) {
        // Me guardo ese unico nodo
        let unicoNodo = this.head;
        // Corto la conexion
        this.head = null
        // Bajo en 1 '_length'
        this._length--;
        // Y retorno el valor de ese unico nodo
        return unicoNodo.value;
    }
    // Si hubiera mas nodos
    // Creo un cursor con el que recorrer la lista
    let cursor = this.head;
    // Hasta encontrar el ante ultimo nodo
    while (cursor.next.next) {
        // Muevo el cursor al nodo apuntado
        cursor = cursor.next;
    }
    // Ahora que el cursor esta en el nodo ante ultimo
    // Me guardo el ultimo nodo
    let ultimoNodo = cursor.next;
    // y desconecto el ante ultimo nodo
    cursor.next = null;
    // Bajo en 1 '_length'
    this._length--;
    // y retorno el valor del que era el ultimo nodo
    return ultimoNodo.value;
}

LinkedList.prototype.search = function(check) {
    // Si el filtro fuera una funcion llamo a filter
    if (check instanceof Function) return this.filter(check);
    // Declaro un puntero que apunta al head
    let pointer = this.head;
    // Mientras el puntero apunte a algo
    while (pointer) {
        // Compruebo el filtro
        if (check === pointer.value) return pointer.value;
        // Si no se cumplieron los filtros paso al siguiente nodo
        pointer = pointer.next;
    }
    // Si ya recorri todos nodos retorno null
    return null;
}

LinkedList.prototype.filter = function(check) {
    // Declaro un puntero que apunta al head
    let pointer = this.head;
    // Mientras el puntero apunte a algo
    while (pointer) {
        // Compruebo el filtro
        if (check(pointer.value)) return pointer.value;
        // Si no se cumplieron los filtros paso al siguiente nodo
        pointer = pointer.next;
    }
    // Si ya recorri todos nodos retorno null
    return null;
}

function BinarySearchTree(value) {
    this.value = value;
    this.left = null;
    this.right = null;
};

BinarySearchTree.prototype.size = function () {
    // Declaro una variable que acumula el tamaño
    var ret = 1;
    // Si existiera izquierda le sumo su tamaño
    if (this.left) ret += this.left.size();
    // Si existiera derecha le sumo su tamaño
    if (this.right) ret += this.right.size();
    // retorno el tamaño
    return ret;
};

BinarySearchTree.prototype.insert = function (value) {
    // Si el valor del arbol acutal es mayor que el valor a ingresar voy a la izquerda
    if (this.value > value) {
        // Y no existe un arbol a la izquierda
        if (!this.left) {
            // Agrego ahi un nuevo arbol que el valor a ingresar
            this.left = new BinarySearchTree(value);
        } else {
            // Pero si existiera un arbol a la izquierda
            // Inserto el valor en ese arbol ese (recursion)
            this.left.insert(value);
        }
    } else {
        // Pero si el valor es menor o igual que el valor a ingresar
        // Y no existe un arbol a la derecha
        if (!this.right) {
            // Agrego ahi un nuevo arbol com el valor a ingresar
            this.right = new BinarySearchTree(value);
        } else {
            // Pero si existiera un arbol a la derecha
            // Inserto el valor en ese arbol (recursion)
            this.right.insert(value);
        }
    }
};

BinarySearchTree.prototype.contains = function(checkValue) {
    // Si el valor del nodo actual es igual que el valor buscado retorno true
    if (this.value === checkValue) return true;
    // Si el valor del nodo actual es mayor que el valor buscado
    // Y existe un nodo a la izquierda
    // recursiono en la izquierda
    if (this.value > checkValue && this.left) return this.left.contains(checkValue);
    // Si el valor del nodo actual es menor que el valor buscado
    // Y existe un nodo a la derecha
    // recursiono en la derecha
    if ( this.value < checkValue && this.right) return this.right.contains(checkValue);
    // Si no quiere decir que termino la busqueda y retorno false
    return false
}

BinarySearchTree.prototype.depthFirstForEach = function(cb, order) {
    if (order === "in-order" || !order) {
        // in-order => left -> actual -> right
        // Si existiera left recursiono en left
        if (this.left) this.left.depthFirstForEach(cb, order);
        // Llamo al callback con el valor actual
        cb(this.value);
        // Si existiera right recursiono en right
        if (this.right) this.right.depthFirstForEach(cb, order);
    } else if (order === "pre-order") {
        // pre-order => actual -> left -> right
        // Llamo al callback con el valor actual
        cb(this.value);
        // Si existiera left recursiono en left
        if (this.left) this.left.depthFirstForEach(cb, order);
        // Si existiera right recursiono en right
        if (this.right) this.right.depthFirstForEach(cb, order);
    } else if (order === "post-order") {
        // post-order => left -> right -> actual
        // Si existiera left recursiono en left
        if (this.left) this.left.depthFirstForEach(cb, order);
        // Si existiera right recursiono en right
        if (this.right) this.right.depthFirstForEach(cb, order);
        // Llamo al callback con el valor actual
        cb(this.value);
    }
}

BinarySearchTree.prototype.breadthFirstForEach = function(cb) {
    // Declaro un for que inicialice un array con this
    // mientras el largo del mismo sea mayor a cero
    // Voy quitando el primer elemento del array 
    // De esta manera cada arbol recorrido va agregando sus subarboles a la ejecucion del for
    for (var pointers = [this]; pointers.length > 0; pointers.shift()) {
        // Llamo al callback con el valor de cada puntero
        cb(pointers[0].value);
        // Y si tubiera derecha o izquierda lo agrego al array
        if(pointers[0].left) pointers.push(pointers[0].left)
        if(pointers[0].right) pointers.push(pointers[0].right)
    }
}
*/
//#endregion ^^^ ^^^

// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint se les brindarán las 
// implementaciones ya realizadas en las homeworks de 
// Queue, LinkedList y BinarySearchTree.
// Sobre dichas implementaciónes van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo.
// Pero todos los métodos ya implementados en las homeowrks no es 
// necesario que los vuelvan a definir.

 //-FIX:
const {
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
} = require('./DS.js');



// ----- Closures -----

//* EJERCICIO 1
// Implementar la funcion 'exponencial' que recibe un parametro entero 'exp'
// y retorna una una funcion, nos referiremos a esta ultima como funcion hija,
// y a 'exponencial' como la funcion padre, la funcion hija debe de recibir 
// un parametro y retornar dicho parametro elevado al parametro 'exp' de 
// la funcion padre original 'exponencial'
// Ejemplo:
// > var sqrt = exponencial(2);
// > sqrt(2);
// < 4
// > sqrt(3);
// < 9
// > sqrt(4);
// < 16

function exponencial(exp) {
    return function (base) {
        return Math.pow(base, exp);
    }
}
let sqrt = exponencial(2);
console.log(sqrt(4));

// ----- Recursión -----

//* EJERCICIO 2
// Crear la funcion 'direcciones':
// La funcion debe retornar un string de los movimientos Norte(N), Sur(S), Este(E), Oeste(O)
// que se deben realizar, para llegar al destino de un laberinto dado.
//
// Ejemplo: dado el siguiente laberinto:
let laberintoExample = { // direccion = ""
    N: 'pared',
    S: { // direccion = "S"
        N: 'pared',
        S: 'pared',
        E: { // direccion = "SE"
            N: 'destino', // direccion = "SEN"
            S: 'pared',
            E: 'pared',
            O: 'pared'
        },
        O: { // direccion = "SO"
            N: 'pared',
            S: 'pared',
            E: 'pared',
            O: 'pared'
        }
    },
    E: 'pared',
    O: 'pared'
}
// El retorno de la funcion 'direcciones' debe ser 'SEN', ya que el destino se encuentra
// haciendo los movimientos SUR->ESTE->NORTE
// Aclaraciones: el segundo parametro que recibe la funcion ('direccion') puede ser pasado vacio (null)

function direcciones(laberinto) {
    
    let dir = '';
for(let prop in laberinto){
    if(typeof laberinto[prop] === 'object'){
        dir+= prop;
        return dir + direcciones(laberinto[prop]);
    }
    if(laberinto[prop] === 'destino'){
        return prop;
    }
}
return dir;

    /* 1er intento
    let direction = [];
    
    function objSinPared (obj) {
        for (const key in obj) {
            if (obj[key] != 'pared') return true;
        }
        return false;
    }

    return (function lab (laberinto){
        
        for (const key in laberinto) {
            if (laberinto[key] === 'destino') {
                return direction.push(key)
            }else if (typeof laberinto[key] === 'object' && objSinPared(laberinto[key])) {
                direction.push(key);
                lab(laberinto[key]);
            } else continue
        }

        return direction.join("");
    })(laberinto);
    */
}
console.log(direcciones(laberintoExample));

//* EJERCICIO 3
// Crea la funcion 'deepEqualArrays':
// Dado que las comparaciones en javascript aveces son un problema como con el siguiente ejemplo:
// [0,1,2] === [0,1,2] => false // puede probarlo en la consola
// con objetos o arrays identicos surge la necesidad de comparar en 'profundidad' arrays u objetos
// en este caso la funcion solo va a ser pensada para recibir arrays,
// pero estos pueden tener multiples niveles de anidacion, y la funcion deepEqualArrays debe
// comparar cada elemento, sin importar la profundidad en la que este
// Ejemplos: 
// deepEqualArrays([0,1,2], [0,1,2]) => true
// deepEqualArrays([0,1,2], [0,1,2,3]) => false
// deepEqualArrays([0,1,[[0,1,2],1,2]], [0,1,[[0,1,2],1,2]]) => true

function deepEqualArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (typeof arr1[i] !== 'object' && arr1[i] === arr2[i]) return true;
        else deepEqualArrays(arr1[i], arr2[i]);
    }

    return false;
}
console.log(deepEqualArrays([0,1,[[0,1,2],1,2]], [0,1,[[0,1,2],1,2]]));


// ----- LinkedList -----

// Deben completar la siguiente implementacion 'OrderedLinkedList'(OLL)
// que es muy similar a las LinkedList vistas en clase solo que 
// los metodos son distintos y deben de estar pensados para conservar la lista
// ordenada de mayor a menor.
// ejemplos:
// head --> 5 --> 3 --> 2 --> null
// head --> 4 --> 3 --> 1 --> null
// head --> 9 --> 3 --> -1 --> null
// Las dos clases principales ya van a estar implementadas a continuacion:
function OrderedLinkedList() {
    this.head = null;
}
// notar que Node esta implementado en el archivo DS

// Y el metodo print que permite visualizar la lista:
OrderedLinkedList.prototype.print = function(){
    let print = 'head'
    let pointer = this.head
    while (pointer) {
        print += ' --> ' + pointer.value
        pointer = pointer.next;
    }
    print += ' --> null'
    return print
}


//* EJERCICIO 4
// Crea el metodo 'add' que debe agregar nodos a la OLL de forma que la misma se conserve ordenada:
// Ejemplo:
// > LL.print()
// < 'head --> null'
// > LL.add(1)
// > LL.print()
// < 'head --> 1 --> null'
//    2       c
// > LL.add(5)
// > LL.print()
// < 'head --> 5 --> 1 --> null'
// > LL.add(4)
// > LL.print()
// < 'head --> 5 --> 3 --> 1 --> null'
//               4
OrderedLinkedList.prototype.add = function(val){

    let nNode = new Node(val);
    let current = this.head;

    if (!this.head) return this.head = nNode; // Caso 1: Lista vacía, creamos cabeza.

    if (val > this.head.value) { // Caso 2: Lista solo cabeza y añadir adelante.
        nNode.next = current;
        return this.head = nNode;
    }
    
    while(current.next){ // Caso 3: Añadir entre 2 nodos (hay Head y Next).

        current = current.next;
        
        if(val > current.value){
            let aux = current.value;
            current.value = val;
            val = aux;
        }
        
    }
    
    return current.next = new Node(val); //Caso Base: No hay menores, añadir al final en lugar de null.

}
let ll = new OrderedLinkedList()
ll.add(5);
ll.add(7);
ll.add(6); // 7,6,5
ll.add(8); // 8,7,6,5
console.log(ll.print())


//* EJERCICIO 5
// Crea el metodo 'removeHigher' que deve devolver el valor mas alto de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeHigher = function(){
  
    if(!this.head) return null;

    let value = this.head.value;

    this.head = this.head.next;

    return value;

}


//* EJERCICIO 6
// Crea el metodo 'removeLower' que deve devolver el valor mas bajo de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeLower = function(){

    current = this.head;

    if (!current) return null;

    if (!current.next) {
        this.head = null;
        return current.value;
    }

    let result;

    while (current.next.next) {
        current = current.next;
    }

    result = current.next;
    current.next = null;
    
    return result.value;
}



// ----- QUEUE -----

//* EJERCICIO 7
// Implementar la funcion multiCallbacks:
// la funcion multiCallbacks recibe dos arrays de objetos cuyas propiedades son dos,
// 'cb' que es una funcion, y 'time' que es el tiempo estimado de ejecucion de dicha funcion 
// este ultimo representado con un integer como se muestra acontinuacion:
// let cbsExample = [
//     {cb:function(){}, time: 2},
//     {cb:function(){}, time: 3}
// ]
// De manera que lo que nuestra funcion 'multiCallbacks' debe de ir ejecutando las funciones 
// sin pasarle parametros pero debe ir alternando las funciones de cbs1 y cbs2 
// segun cual de estas se estima que tarde menos, retornando un arreglo de resultados
// de las mismas en el orden que fueron ejecutadas
// Ejemplo:
 let cbs1 = [
      {cb:function(){return '1-1'}, time: 2},
      {cb:function(){return '1-2'}, time: 3}
  ];
 let cbs2 = [
      {cb:function(){return '2-1'}, time: 1},
      {cb:function(){return '2-2'}, time: 4}
  ];
// > multiCallbacks(cbs1, cbs2);
// < ["2-1", "1-1", "1-2", "2-2"];

function multiCallbacks(cbs1, cbs2){

    let allInOne = [...cbs1, ...cbs2]; // [...[1,2], ...[3,4]] => [1,2,3,4]
    let results = [];

    allInOne.sort((a , b) => a.time - b.time).forEach(obj => results.push(obj.cb()));

    return results;
}
console.log(multiCallbacks(cbs1, cbs2));


// ----- BST -----

//* EJERCICIO 8
// Implementar el metodo 'toArray' en el prototype del BinarySearchTree
// que devuelva los valores del arbol en una array ordenado
// Ejemplo:
//     32
//    /  \
//   8   64
//  / \
// 5   9
// resultado:[5,8,9,32,64]

BinarySearchTree.prototype.toArray = function() {

    let array = [];

    if(this.left){

        array = array.concat(this.left.toArray());
    }

    array.push(this.value);

    if(this.right){

        array = array.concat(this.right.toArray());

    }

    return array;
}
const BST = new BinarySearchTree(32); const arr = [8, 64, 5, 9]; arr.forEach(e => BST.insert(e));

console.log(BST.toArray())


// ----- Algoritmos -----

//* Ejercicio 9
// Implementar la funcion 'primalityTest' que dado un valor numerico entero
// debe de retornar true or false dependiendo de si este es primo o no.
// Puede que este es un algoritmo que ya hayan implementado pero entenderan
// que es un algoritmo que segun la implementacion puede llegar a ser muy costoso
// para numeros demasiado grandes, asi que vamos a implementarlo mediante un metodo
// derivado de Trial Division como el que se muestra aca:
// https://en.wikipedia.org/wiki/Primality_test
// Si bien esta no es la mejor implementacion existente, con que uds puedan 
// informarse sobre algoritmos, leerlos de un pseudocodigo e implemnterlos alcanzara

function primalityTest(n) {
    if (n < 2 || n % 1 > 0) return false;
    if (n === 2 || n === 3) return true;
    
    if (
        n > 3 &&
        n % 2 > 0 &&
        n % 3 > 0
    ) return true;

    return false;
}
console.log(primalityTest(2));
console.log(primalityTest(3));
console.log(primalityTest(5));
console.log(primalityTest(7));
console.log("***")
console.log(primalityTest(4));
console.log(primalityTest(6));
console.log(primalityTest(8));
console.log(primalityTest(9));
console.log("***")
console.log(primalityTest(-1));
console.log(primalityTest(0));
console.log(primalityTest(1));



//* EJERCICIO 10
// Implementa el algoritmo conocido como 'quickSort', que dado un arreglo de elemntos
// retorn el mismo ordenado de 'mayor a menor!'
// https://en.wikipedia.org/wiki/Quicksort

function quickSort(array) {
    // elige un elemento. Acomodoa el resto en dos arreglos, a la izquierda menores, a la derecha mayores. Repite el proceso en los arreglos derivados.
    // El punto de corte es cuando el arreglo ya no se puede dividir.
    // Retorna el elemento final. Agrega todos los elementos finales en un arreglo.
    
    if (typeof array[0] === 'undefined') return [];

    let mayores = [];
    let menores = [];
    
    if (array.length < 3) {

        for (let i = 0; i < array.length-1; i++) {
            
            if (array[i] > array[array.length -1]) mayores.push(array[i]);
            else menores.push(array[i]);
            
        }
        
        return [...mayores, array[array.length -1], ...menores];
    }
    
    for (let i = 0; i < array.length-1; i++) {
            
        if (array[i] > array[array.length -1]) mayores.push(array[i]);
        else menores.push(array[i]);
        
    }

    return [...quickSort(mayores), array[array.length -1], ...quickSort(menores)];
}
console.log(quickSort([]));
console.log(quickSort([1,2]));
console.log(quickSort([2,5,9,3,4,7,1]));
/*
[2,5,9,3,4,7,1]
menores []
*/
// QuickSort ya lo conocen solo que este 
// ordena de mayor a menor
// para esto hay que unir como right+mid+left o cambiar el 
// signo menor en la comparacion con el pivot




//? ----- EXTRA CREDIT -----

//*  EJERCICIO 11
// Implementa la función 'reverse', que recibe un numero entero como parametro
// e invierte el mismo.
// Pero Debería hacer esto sin convertir el número introducido en una cadena, o un array
// Ejemplo:
// > reverse(123);
// < 321
// > reverse(95823);
// < 32859

// 1) Saber el múltiplo de 10 que supera al num => numMayor.
// 2) Copia del num original para ir modificando => numC.
// 3) Sumador de valores para el resultado => resultado.
// 4) Contador para el ciclo => contador.

function reverse(num){

    let numMayor = 10;
    while (numMayor < num) {
        numMayor *= 10;
    }

    let numC = num;
    let resultado = 0;
    let contador = 10;

    while (contador < num) {
        resultado += numC % 10 * numMayor/contador;
        numC = (numC - numC % 10) / 10; // = Math.floor(num/10)
        contador *= 10;
    } 
    
    return resultado + numC;
}
console.log(reverse(123456789));


// la grandiosa resolucion de Wilson!!!
// declaran una variable donde 
// almacenar el el numero invertido
// y van multiplicando por 10 la 
// porcion del numero que ya invirtieron
// deforma que esta se corra hacia la izq
// para agregar el ultimo numero de la 
// porcion no revertida
// y luego le quitan a la porcion 
// no revertida el ultimo numero

module.exports = {
    exponencial,
    direcciones,
    deepEqualArrays,
    OrderedLinkedList,
    multiCallbacks,
    primalityTest,
    quickSort,
    reverse,
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
}