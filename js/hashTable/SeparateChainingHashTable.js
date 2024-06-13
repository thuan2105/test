import Node from "./Node.js";

class SeparateChainingHashTable {
  constructor(loadFactor = 0.5, capacity = 10) {
    if (capacity < 10) throw new Error("Invalid capacity!");
    if (loadFactor <= 0 || isNaN(loadFactor) || !isFinite(loadFactor)) {
      throw new Error("Invalid load factor!");
    }
    this.loadFactor = loadFactor;
    this.capacity = Math.max(10, capacity);
    this.size = 0;
    this.threshold = Math.floor(this.capacity * this.loadFactor);
    this.table = new Array(this.capacity).fill(null).map(() => []);
  }

  size() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  clear() {
    this.table = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  hashCodeToIndex(hashedIndex) {
    return (hashedIndex & 0xffffffff) % this.capacity;
  }

  has(key) {
    const index = this.hashCodeToIndex(this.hashCode(key));
    const bucket = this.table[index];
    return bucket.some((node) => node.key === key);
  }

  insert(key, value) {
    const index = this.hashCodeToIndex(this.hashCode(key));
    const bucket = this.table[index];
    for (const node of bucket) {
      if (node.key === key) {
        const oldValue = node.value;
        node.value = value;
        return oldValue;
      }
    }
    bucket.push(new Node(key, value));
    this.size++;
    if (this.size > this.threshold) this.resizeTable();
    return null;
  }

  hashCode(key) {
    return key
      .toString()
      .split("")
      .reduce((hash, char) => {
        hash = (hash << 5) - hash + char.charCodeAt(0);
        return hash & hash;
      }, 0);
  }

  get(key) {
    const index = this.hashCodeToIndex(this.hashCode[key]);
    const bucket = this.table[index];
    for (const node of bucket) {
      if (node.key === key) {
        return node.value;
      }
    }
    return null;
  }

  remove(key) {
    const index = this.hashCodeToIndex(this.hashCode(key));
    const bucket = this.table[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        const node = bucket.splice(i, 1)[0];
        this.size--;
        return node.value;
      }
    }
    return null;
  }

  resizeTable() {
    const oldTable = this.table;
    this.capacity *= 2;
    this.threshold = Math.floor(this.capacity * this.loadFactor);
    this.table = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
    for (const bucket of oldTable) {
      for (const node of bucket) {
        this.insert(node.key, node.value);
      }
    }
  }

  [Symbol.iterator]() {
    let index = 0;
    let bucketIndex = 0;
    const table = this.table;
    return {
      next() {
        while (index < table.length) {
          const bucket = table[index];
          if (bucketIndex < bucket.length) {
            const node = bucket[bucketIndex++];
            return {
              value: node.value,
              done: false,
            };
          }
          index++;
          bucketIndex = 0;
        }
        return {
          done: true,
        };
      },
    };
  }
}

export default SeparateChainingHashTable;
