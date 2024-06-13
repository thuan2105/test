class OpenAddressingTableBase {
  constructor(loadFactor = 0.6, capacity = 7) {
    if (capacity < 0) throw new Error("Capacity is invalid!");
    if (loadFactor <= 0 || isNaN(loadFactor) || !isFinite(loadFactor))
      throw new Error("Load factor is invalid!");

    this.loadFactor = loadFactor;
    this.capacity = Math.max(7, capacity);
    this.adjustCapacity();
    this.threshold = Math.floor(this.capacity * this.loadFactor);
    this.useSlots = 0;
    this.keyCount = 0;
    this.keys = new Array(this.capacity).fill(null);
    this.values = new Array(this.capacity).fill(null);
    this.TOMBSTONE = Symbol("TOMBSTONE");
  }

  setupProbing(key) {}

  probe(x) {}

  adjustCapacity() {}

  increaseCapacity() {
    this.capacity *= 2;
  }

  clear() {
    this.keys.fill(null);
    this.values.fill(null);
    this.useSlots = 0;
    this.keyCount = 0;
  }

  size() {
    return this.keyCount;
  }

  isEmpty() {
    return this.keyCount === 0;
  }

  hashCodeIndex(hashKey) {
    return (hashKey >>> 0) % this.capacity;
  }

  keys() {
    return this.keys.filter((key) => key !== null && key !== this.TOMBSTONE);
  }

  values() {
    return this.values.filter(
      (value, index) =>
        this.keys[index] !== null && this.keys[index] !== this.TOMBSTONE
    );
  }

  resizeCapacity() {
    this.increaseCapacity();
    this.adjustCapacity();
    this.threshold = Math.floor(this.capacity * this.loadFactor);

    const oldKeys = this.keys;
    const oldValues = this.values;
    this.keys = new Array(this.capacity).fill(null);
    this.values = new Array(this.capacity).fill(null);
    this.useSlots = 0;
    this.keyCount = 0;

    for (let i = 0; i < oldKeys.length; i++) {
      if (oldKeys[i] !== null && oldKeys[i] !== this.TOMBSTONE) {
        this.insert(oldKeys[i], oldValues[i]);
      }
    }
  }

  greatestCommonDivisor(a, b) {
    return b === 0 ? a : this.greatestCommonDivisor(b, a % b);
  }

  insert(key, value) {
    if (key === null) throw new Error("Null key");
    if (this.useSlots >= this.threshold) this.resizeCapacity();
    this.setupProbing(key);

    const offset = this.hashCodeIndex(this.hashCode(key));
    for (
      let i = offset, x = 1, firstTombstoneIndex = -1;
      ;
      i = this.hashCodeIndex(offset + this.probe(x++))
    ) {
      if (this.keys[i] === this.TOMBSTONE) {
        if (firstTombstoneIndex === -1) {
          firstTombstoneIndex = i;
        }
      } else if (this.keys[i] !== null) {
        if (this.keys[i] === key) {
          const oldValue = this.values[i];
          if (firstTombstoneIndex === -1) {
            this.values[i] = value;
          } else {
            this.keys[firstTombstoneIndex] = key;
            this.values[firstTombstoneIndex] = value;
            this.keys[i] = this.TOMBSTONE;
            this.values[i] = null;
          }
          return oldValue;
        }
      } else {
        if (firstTombstoneIndex === -1) {
          this.useSlots++;
          this.keyCount++;
          this.keys[i] = key;
          this.values[i] = value;
        } else {
          this.keyCount++;
          this.keys[firstTombstoneIndex] = key;
          this.values[firstTombstoneIndex] = value;
        }
        return null;
      }
    }
  }

  has(key) {
    if (key === null) throw new Error("Key null!");
    this.setupProbing(key);
    const offset = this.hashCodeIndex(hashCode(key));
    for (
      let i = offset, x = 1, firstTombstoneIndex = -1;
      ;
      i = this.hashCodeIndex(offset + this.probe(x++))
    ) {
      if (this.keys[i] === this.TOMBSTONE) {
        if (firstTombstoneIndex !== -1) {
          firstTombstoneIndex = i;
        }
      } else if (this.keys[i] !== null) {
        if (this.keys[i] === key) {
          if (firstTombstoneIndex !== -1) {
            this.keys[firstTombstoneIndex] = key;
            this.values[firstTombstoneIndex] = this.values[i];
            this.keys[i] = this.TOMBSTONE;
            this.values[i] = null;
          }
          return true;
        }
      } else return false;
    }
  }

  get(key) {
    if (key === null) throw new Error("Key null!");
    this.setupProbing(key);
    const offset = this.hashCodeIndex(this.hashCode(key));
    for (
      let i = offset, x = 1, firstTombstoneIndex = -1;
      ;
      i = this.hashCodeIndex(offset + this.probe(x++))
    ) {
      if (this.keys[i] === this.TOMBSTONE) {
        if (this.keys[firstTombstoneIndex] !== -1) {
          firstTombstoneIndex = i;
        }
      } else if (this.keys[i] !== null) {
        if (this.keys[i] === key) {
          const value = this.values[i];
          if (firstTombstoneIndex !== -1) {
            this.keys[firstTombstoneIndex] = key;
            this.keys[firstTombstoneIndex] = this.values[i];
            this.keys[i] = this.TOMBSTONE;
            this.values[i] = null;
          }
          return value;
        }
      } else return null;
    }
  }

  remove(key) {
    if (key === null) throw new Error("Key null!");
    this.setupProbing(key);
    const offset = this.hashCodeIndex(this.hashCode(key));
    for (
      i = offset, x = 1;
      ;
      i = this.hashCodeIndex(offset + this.probe(x++))
    ) {
      if (this.keys[i] === this.TOMBSTONE) continue;
      if (this.keys[i] === null) return null;
      if (this.keys[i] === key) {
        const oldValue = this.values[i];
        this.keyCount--;
        this.keys[i] = this.TOMBSTONE;
        this.values[i] = null;
        return oldValue;
      }
    }
  }

  toString() {
    const entities = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.keys[i] !== null && this.keys[i] !== this.TOMBSTONE) {
        entities.push(`${this.keys[i]} > ${this.values[i]}`);
      }
      return `{${entities.join(", ")}}`;
    }
  }

  [Symbol.iterator]() {
    let index = 0;
    let keysLeft = this.keyCount;
    return {
      hasNext: () => {
        return keysLeft !== 0;
      },
      next: () => {
        while (this.keys[i] !== null && this.keys[i] !== this.TOMBSTONE)
          index++;
        keysLeft--;
        return this.keys[index++];
      },
    };
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
}

export default OpenAddressingTableBase;
