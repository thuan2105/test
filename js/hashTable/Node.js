class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    // this.hash = this.key.hashCode();
  }

  equals(other) {
    return this.hash === other.hash && this.key === other.key;
  }

  // getHash() {
  //   return this.hash;
  // }

  getKey() {
    return this.key;
  }

  getValue() {
    x;
    return this.value;
  }

  setKey(key) {
    this.key = key;
  }

  setValue(value) {
    this.value = value;
  }

  toString() {
    return `key = ${this.key}, value = ${this.value}`;
  }
}

export default Node;
