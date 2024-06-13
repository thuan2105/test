import DynamicArray from "../array/DynamicArray.js";

class ArrayBaseStack {
  constructor(initSize) {
    this.array = new DynamicArray(initSize);
    this.index = -1;
  }

  ensureNotEmpty() {
    if (this.isEmpty()) throw new Error("EmptyStackException");
  }

  push(element) {
    this.index++;
    this.array.add(element);
  }

  pop() {
    this.ensureNotEmpty();
    return this.array.removeAtWithoutMoving(this.index--);
  }

  top() {
    return this.array.get(this.index);
  }

  size() {
    return this.array.size();
  }

  isEmpty() {
    return this.array.isEmpty();
  }

  [Symbol.iterator]() {
    return this.array[Symbol.iterator]();
  }
}

export default ArrayBaseStack;
