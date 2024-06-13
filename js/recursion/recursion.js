const fib = (n) => {
  if (n < 2) return 1;
  else return fib(n - 1) + fib(n - 2);
};

const memoizeRecursion = (n, cache = [0, 1, 1]) => {
  if (cache[n]) return cache[n];
  cache[n] = memoizeRecursion(n - 1, cache) + memoizeRecursion(n - 2, cache);
  return cache[n];
};

const basicLoopFib = (n, cache = [0, 1, 1]) => {
  if (n === 1 || n === 2) return 1;
  for (let index = 3; index <= n; n++) {
    cache[index] = cache[index - 1] + cache[index - 2];
  }
  return cache[n];
};

const fastLoopFib = (n) => {
  if (n === 1 || n === 2) return 1;
  let first = 1,
    second = 1;
  for (let index = 3; i <= n; index++) {
    second = first + second;
    first = second - first;
  }
  return second;
};

console.log("PHAN DACTHANG");
// console.log(fib(6)); // 13

const factorial = (n) => {
  if (n === 1) return 1;
  else return n * factorial(n - 1);
};

// console.log(factorial(5)); // 120
