class DynamicArray {
  constructor(capacity = 10) {
    if (capacity < 0)
      throw new Error(`Capacity cannot be negative: ${capacity}`);

    this.capacity = capacity;
    this.arr = new Array(capacity);
    this.size = 0;
  }

  size() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  get(index) {
    return this.arr[index];
  }

  set(index, element) {
    return (this.arr[index] = element);
  }

  clear() {
    for (let i = 0; i < this.size; i++) {
      this.arr[i] = null;
    }
    this.size = 0;
  }

  add(element) {
    if (this.size >= this.capacity - 1) {
      if (this.capacity === 0) {
        this.capacity = 1;
      } else {
        this.capacity *= 2;
      }

      let newArr = new Array(this.capacity);
      for (let i = 0; i < this.arr.length; i++) {
        newArr[i] = this.arr[i];
      }
      this.arr = newArr;
    }
    this.arr[this.size++] = element;
  }

  removeAt(removeIndex) {
    if (removeIndex >= this.size || removeIndex < 0)
      throw new Error("IndexOutOfBoundsException");
    let newArr = new Array(this.size - 1);
    for (
      let oldArrIndex = 0, newArrIndex = 0;
      oldArrIndex < this.size;
      oldArrIndex++, newArrIndex++
    ) {
      if (oldArrIndex === removeIndex) {
        newArrIndex--;
      } else {
        newArr[newArrIndex] = this.arr[oldArrIndex];
      }
    }
    this.arr = newArr;
    this.capacity = --this.size;
  }

  removeAtWithoutMoving(removeIndex) {
    if (removeIndex >= this.size || removeIndex < 0)
      throw new Error("Index out of bounds exception");
    let item = this.arr[removeIndex];
    this.arr[removeIndex] = null;
    this.capacity = --this.size;
    return item;
  }

  remove(object) {
    let removeIndex = this.indexOf(object);
    if (removeIndex !== -1) {
      this.removeAt(removeIndex);
    } else {
      console.error("Object not found in the array.");
    }
  }

  indexOf(object) {
    for (let i = 0; i < this.size; i++) {
      if (object === null) {
        if (this.arr[i] === null) {
          console.log(i);
          return i;
        }
      } else {
        if (object === this.arr[i]) {
          return i;
        }
      }
    }
    return -1;
  }

  contains(object) {
    return this.indexOf(object) !== -1;
  }

  [Symbol.iterator]() {
    let index = 0;
    let arr = this.arr;
    let size = this.size;
    return {
      next() {
        if (index < size) {
          return {
            value: arr[index++],
            done: false,
          };
        } else {
          return {
            done: true,
          };
        }
      },
    };
  }

  toString() {
    if (this.isEmpty()) {
      return "[]";
    } else {
      let sb = "[";
      for (let i = 0; i < this.size - 1; i++) {
        sb += this.arr[i] + ",";
      }
      sb += this.arr[this.size - 1] + "]";
      return sb;
    }
  }
}

export default DynamicArray;

// let dynamicArray = new DynamicArray();
// dynamicArray.add("O");
// console.log(dynamicArray.size);
// dynamicArray.add("O");
// console.log(dynamicArray.size);
// dynamicArray.add("O");
// console.log(dynamicArray.size);
// dynamicArray.add("O");
// console.log(dynamicArray.size);
// dynamicArray.add("O");
// console.log(dynamicArray.size);
// dynamicArray.add("O");
// console.log(dynamicArray.size);
// dynamicArray.add("O");
// console.log(dynamicArray.size);
// dynamicArray.add("O");
// console.log(dynamicArray.size);
// dynamicArray.add("O");
// console.log(dynamicArray.size);
// dynamicArray.add("O");
// console.log(dynamicArray.size);
// dynamicArray.add("O");
// console.log(dynamicArray.size);
// dynamicArray.add("O");
// console.log(dynamicArray.size);
// dynamicArray.add("O");
// console.log(dynamicArray.size);
