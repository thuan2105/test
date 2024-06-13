import QuadraticProbingHashTable from "./QuadraticProbingHashTable.js";

const testQuadraticProbing = () => {
  const NUMBER_OF_KEYS = 1000000;
  const MOD = 100000;
  const keys = Array.from({ length: NUMBER_OF_KEYS }, () =>
    Math.floor(Math.random() * MOD)
  );
  const values = Array.from({ length: NUMBER_OF_KEYS }, () =>
    Math.floor(Math.random() * MOD)
  );

  const hashTable = new QuadraticProbingHashTable();

  const start = Date.now();
  for (let i = 0; i < NUMBER_OF_KEYS; i++) {
    hashTable.insert(keys[i], values[i]);
    const value = hashTable.get(keys[i]);
    console.log(value);
    if (value !== values[i]) {
      console.error("Mismatch detected!");
    }
  }
  const end = Date.now();
  console.log(`Separate chaining: ${(end - start) / 1000} seconds`);
};

export default testQuadraticProbing;
