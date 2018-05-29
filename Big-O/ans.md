Big O Notation Exercises
Part 1
Simplify the following big O expressions as much as possible:

O(n + 10) = O(n)
O(100 * n) = O(n)
O(25) = O(1)
O(n^2 + n^3) = O(n^3)
O(n + n + n + n) = O(n)
O(1000 * log(n) + n) = O(log(n))
O(1000 * n * log(n) + n) = O(n*logn)
O(2^n + n^2) = O(2^n)
O(5 + 3 + 1) = O(1)
O(n + n^(1/2) + n^2 + n * log(n)^10) = O(n^2), because log^10 is just 1?

Part 2
Determine the time and space complexities for each of the following functions. If you're not sure what these functions do, copy and paste them into the console and experiment with different inputs!

logUpTo
function logUpTo(n) {
for (var i = 1; i <= n; i++) {
console.log(i);
}
}
Time Complexity: O(n)

Space Complexity: O(1)

logAtMost10
function logAtMost10(n) {
for (var i = 1; i <= Math.min(n, 10); i++) {
console.log(i);
}
}
Time Complexity:

Space Complexity:

logAtLeast10
function logAtLeast10(n) {
for (var i = 1; i <= Math.max(n, 10); i++) {
console.log(i);
}
}
Time Complexity:

Space Complexity:

onlyElementsAtEvenIndex
function onlyElementsAtEvenIndex(array) {
var newArray = [];
for (var i = 0; i < array.length; i++) {
if (i % 2 === 0) {
newArray.push(array[i]);
}
}
return newArray;
}
Time Complexity:

Space Complexity:

subtotals
function subtotals(array) {
var subtotalArray = [];
for (var i = 0; i < array.length; i++) {
var subtotal = 0;
for (var j = 0; j <= i; j++) {
subtotal += array[j];
}
subtotalArray.push(subtotal);
}
return subtotalArray;
}
Time Complexity:

Space Complexity:

Part 3
True or false: n^2 + n is O(n^2).
True or false: n^2 + n is O(n^3).
True or false: n^2 + n is O(n).
What's the time complexity of the .indexOf array method?
What's the time complexity of the .includes array method?
