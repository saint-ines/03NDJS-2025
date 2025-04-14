 // main.js
const { sum, diff, prod, quot } = require('./math');

// Call functions and log results
console.log("5 + 3 =", sum(5, 3));        // Output: 5 + 3 = 8
console.log("5 - 3 =", diff(5, 3));       // Output: 5 - 3 = 2
console.log("5 * 3 =", prod(5, 3));       // Output: 5 * 3 = 15
console.log("6 / 3 =", quot(6, 3));       // Output: 6 / 3 = 2
console.log("5 / 0 =", quot(5, 0));       // Output: 5 / 0 = Error: Division by zero!
