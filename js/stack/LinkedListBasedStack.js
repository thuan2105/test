import DoublyLinkedList from "../linkedList/DoublyLinkedList.js";

class LinkedListBasedStack {
  constructor() {
    this.list = new DoublyLinkedList();
  }

  ensureNotEmpty() {
    if (this.isEmpty()) throw new Error("EmptyStackException");
  }

  push(element) {
    this.list.addLast(element);
  }

  pop() {
    this.ensureNotEmpty();
    return this.list.removeLast();
  }

  top() {
    this.ensureNotEmpty();
    return this.list.peekLast();
  }

  size() {
    return this.list.size;
  }

  isEmpty() {
    return this.list.isEmpty();
  }

  [Symbol.iterator]() {
    return this.list[Symbol.iterator]();
  }
}

export default LinkedListBasedStack;
