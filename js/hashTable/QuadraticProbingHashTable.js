import OpenAddressingTableBase from "./OpenAddressingTableBase.js";

class QuadraticProbingHashTable extends OpenAddressingTableBase {
  constructor(loadFactor = 0.6, capacity = 7) {
    super(loadFactor, capacity);
  }

  static nextPowerOfTwo(n) {
    return 1 << (32 - Math.clz32(n - 1));
  }

  setupProbing() {}

  probe(x) {
    return (x * x + x) >> 1;
  }

  increaseCapacity() {
    this.capacity = QuadraticProbingHashTable.nextPowerOfTwo(this.capacity);
  }

  adjustCapacity() {
    const powerOfTwo = 1 << (32 - Math.clz32(this.capacity - 1));
    if (this.capacity === powerOfTwo) return;
    this.increaseCapacity();
  }
}

export default QuadraticProbingHashTable;
