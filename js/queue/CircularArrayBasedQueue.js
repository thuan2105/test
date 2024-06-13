class CircularArrayBasedQueue {
  constructor(maxSize) {
    this.front = 0;
    this.end = 0;
    this.size = maxSize + 1;
    this.array = new Array(this.size);
  }

  ensureNotEmpty() {
    if (this.isEmpty()) throw new Error("Queue empty!");
  }

  enQueue(element) {
    this.array[this.end] = element;
    this.end = (this.end + 1) % this.size;
    if (this.end === this.size) throw new Error("Queue full!");
  }

  deQueue() {
    this.ensureNotEmpty();
    const dequeueElement = this.array[this.front];
    this.front = (this.front + 1) % this.size;
    return dequeueElement;
  }

  peek() {
    this.ensureNotEmpty();
    return this.array[this.front];
  }

  getSize() {
    if (this.front > this.end) return this.end + this.size - this.front;
    return this.end - this.front;
  }

  isEmpty() {
    return this.front === this.end;
  }

  [Symbol.iterator]() {
    let index = this.front;
    let count = this.getSize();

    return {
      next: () => {
        if (count-- > 0) {
          const value = this.array[index];
          index = (index + 1) % this.size;
          return {
            value,
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
}

export default CircularArrayBasedQueue;
