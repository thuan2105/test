import SeparateChainingHashTable from "./SeparateChainingHashTable.js";

const testSeparateChainingHashTable = () => {
  const NUMBER_OF_KEYS = 1000000;
  const MOD = 100000;
  const keys = Array.from({ length: NUMBER_OF_KEYS }, () =>
    Math.floor(Math.random() * MOD)
  );
  const values = Array.from({ length: NUMBER_OF_KEYS }, () =>
    Math.floor(Math.random() * MOD)
  );

  const hashTable = new SeparateChainingHashTable(0.5, MOD);

  const start = Date.now();
  for (let i = 0; i < NUMBER_OF_KEYS; i++) {
    hashTable.insert(keys[i], values[i]);
    const value = hashTable.get(keys[i]);

    if (value !== values[i]) {
      console.error("Mismatch detected!");
    }
  }
  const end = Date.now();
  console.log(`Separate chaining: ${(end - start) / 1000} seconds`);
};

export default testSeparateChainingHashTable;
