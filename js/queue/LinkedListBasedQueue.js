import DoublyLinkedList from "../linkedList/DoublyLinkedList.js";

class LinkedListBasedQueue {
  constructor() {
    this.linkedList = new DoublyLinkedList();
  }

  ensureNotEmpty() {
    if (this.isEmpty()) throw new Error("Queue empty!");
  }

  isEmpty() {
    return this.linkedList.size === 0;
  }

  enqueue(element) {
    this.linkedList.addLast(element);
  }

  deQueue() {
    this.ensureNotEmpty();
    return this.linkedList.removeFirst();
  }

  peek() {
    this.ensureNotEmpty();
    return this.linkedList.peekFirst();
  }

  [Symbol.iterator]() {
    return this.linkedList[Symbol.iterator]();
  }
}

export default LinkedListBasedQueue;
