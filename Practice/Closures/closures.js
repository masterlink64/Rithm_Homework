/* 
1. Write a function that returns a function with closure
over a 'count' variable that increments each time
*/

function closureCounter() {
  // outer var
  let count = 0;
  // return an inner fn
  return function innerFunc() {
    // inner fn uses outer var
    return ++count;
  };
}

// Tests for #1
closureCounter()(); // 1
closureCounter()(); // 1
var firstCounter = closureCounter();
// console.log(firstCounter()); // 1
// console.log(firstCounter()); // 2
var secondCounter = closureCounter();
secondCounter(); // 1
firstCounter(); // 3

/* 
2. Write a function to act as a module (or API) using closure.
  It should have a private variable called "items" which is an empty array.
  It should return an object with four methods:
      addItem - insert an item at the end of the private array
      removeItemAt - given an index, remove an item from the private array at that index,
                   and returns the removed item
      getItemAt - given an index, return an item from the private array with at that index
      getAll - return a copy of the private array
*/

function itemModule() {
  let items = [];
  // it should return an object with FOUR methods:
  return {
    addItem: item => {
      items.push(item);
      return items;
    },
    removeItemAt: idx => {
      items.splice(idx, 1);
      return items;
    },
    getItemAt: idx => {
      return items[idx];
    },
    getAll: () => {
      return items;
    }
  };
}

// Tests for #2
var instance = itemModule();
console.log(instance.addItem('taco'));
console.log(instance.getItemAt(0)); // taco
console.log(instance.addItem('burrito'));
console.log(instance.getAll()); // ['taco', 'burrito']
console.log(instance.removeItemAt(0)); // 'taco'
console.log(instance.getAll()); // ['burrito']
