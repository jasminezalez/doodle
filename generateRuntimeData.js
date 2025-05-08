const { performance } = require('perf_hooks');
const fs = require('fs');

// Initial thoughts 
// A brute force recursive solution (would be very slow and cause a stack overflow)

// function sequence(n) {
//     if (n == 1 || n == 2) {
//         return n
//     } else if (n % 2 === 0) {
//     // s(n -1) + s(n - 2)
//         return sequence(n - 1) + sequence(n - 2)
//     } else {
//         // 2 * s(n - 1) - s(n - 2)
//         return 2 * sequence(n - 1) - sequence(n - 2)
//     }
// }

// sequence(10000)

// After further thinking -- reminds me of the fibonacci sequence
// Not exactly but it is similar except it doubles for odd numbers

// after further thinking -- maybe we can cache the results so we don't have to recalculate them
// memoization
//.. But it still uses recursion which can also hit stack overflow at a larger n

// function sequence2(n) {
//     const cache = {};

//     function helper(n) {
//         if (cache[n]) return cache[n];
//         if (n === 1) return 1;
//         if (n === 2) return 2;

//         if (n % 2 === 0) {
//             cache[n] = helper(n - 1) + helper(n - 2);
//         } else {
//             cache[n] = 2 * helper(n - 1) - helper(n - 2);
//         }

//         return cache[n];
//     }
//     return helper(n);
// }

// console.log(sequence2(10000)) 

// Maybe looping through would actually be best because we are focused on optimizing to "reduce computational overhead"
// This avoids recursion and runs in O(n) time complexity and even O(1) space

function sequenceOptimized(n) {
    let prev1 = 1;
    let prev2 = 2;
    let current;

    for (let i = 3; i <= n; i++) {
        if (i % 2 === 0) {
            current = prev1 + prev2;
        } else {
            current = 2 * prev1 + prev2;
        }
        prev2 = prev1;
        prev1 = current;
    }

    return current;
}


// Saving n vs runtime
const results = [];

for (let n = 1; n <= 10000; n++) {
  const start = performance.now();
  sequenceOptimized(n);
  const end = performance.now();
  results.push({ n, runtimeMs: end - start });
}

// Saving the results to a file
const jsExport = `const runtimeData = ${JSON.stringify(results, null, 2)};`;
fs.writeFileSync('runtimeData.js', jsExport);


