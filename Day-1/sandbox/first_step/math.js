    // 1. Sum (Addition)
function sum(a, b) {
    return a + b;
}

// 2. Difference (Subtraction)
function diff(a, b) {
    return a - b;
}

// 3. Product (Multiplication)
function prod(a, b) {
    return a * b;
}

// 4. Quotient (Division) - Handles division by zero
function quot(a, b) {
    if (b === 0) {
        return "Error: Division by zero!";
    }
    return a / b;
}

// Export all functions
module.exports = { sum, diff, prod, quot };
