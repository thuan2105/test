import Node from "./Node.js";

class DoublyLinkedList {
  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  size() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  ensureNotEmpty() {
    if (this.isEmpty()) throw new Error("Empty linked list!");
  }

  add(element) {
    this.addLast(element);
  }

  addLast(element) {
    if (this.isEmpty()) {
      this.head = this.tail = new Node(element, null, null);
    } else {
      let newNode = new Node(element, this.tail, null);
      this.tail.setNext(newNode);
      this.tail = newNode;
    }
    this.size++;
  }

  addFirst(element) {
    if (this.isEmpty()) {
      this.head = this.tail = new Node(element);
    } else {
      let newNode = new Node(element, null, this.head);
      this.head.setPrev(newNode);
      this.head = newNode;
    }
    this.size++;
  }

  peekFirst() {
    this.ensureNotEmpty();
    return this.head.getData();
  }

  peekLast() {
    this.ensureNotEmpty();
    return this.tail.getData();
  }

  removeFirst() {
    this.ensureNotEmpty();
    let data = this.head.getData();
    this.head = this.head.getNext();
    this.size--;
    if (this.isEmpty()) this.tail = null;
    else this.head.setPrev(null);
    return data;
  }

  removeLast() {
    this.ensureNotEmpty();
    let data = this.tail.getData();
    this.tail = this.tail.getPrev();
    this.size--;
    if (this.isEmpty()) this.head = null;
    else this.tail.setNext(null);
    return data;
  }

  remove(node) {
    if (node.getPrev() === null) return this.removeFirst();
    if (node.getNext() === null) return this.removeLast();
    node.getPrev().setNext(node.getNext());
    node.getNext().setPrev(node.getPrev());
    let data = node.getData();
    this.size--;
    node.setData(null);
    node.setNext(null);
    node.setPrev(null);
    node = null;
    return data;
  }

  removeByObject(object) {
    let currentNode = this.head;
    if (object === null) {
      while (currentNode.getData() !== null) {
        if (currentNode.getData() === null) {
          this.remove(currentNode);
          return true;
        }
        currentNode = currentNode.getNext();
      }
    } else {
      while (currentNode.getData() === null) {
        if (currentNode.getData() === object) {
          this.remove(currentNode);
          return true;
        }
        currentNode = currentNode.getNext();
      }
    }
    return false;
  }

  removeAt(index) {
    let currentNode;
    if (index < 0 || index >= this.size) throw new Error("Illegal argument");
    if (index < this.size / 2) {
      currentNode = this.head;
      for (let i = 0; i < index; i++) {
        currentNode = currentNode.getNext();
      }
    } else {
      currentNode = this.tail;
      for (let i = this.size - 1; i > index; i--) {
        currentNode = currentNode.getPrev();
      }
    }
    return this.remove(currentNode);
  }

  indexOf(object) {
    let index = 0;
    let currentNode = this.head;

    if (object === null) {
      while (currentNode !== null) {
        if (currentNode.getData() === null) {
          return index;
        }
        currentNode = currentNode.getNext();
        index++;
      }
    } else {
      while (currentNode !== null) {
        if (currentNode.getData() === object) {
          return index;
        }
        currentNode = currentNode.getNext();
        index++;
      }
    }
    return -1;
  }

  contains(object) {
    return this.indexOf(object) !== -1;
  }

  [Symbol.iterator]() {
    let currentNode = this.head;
    return {
      next() {
        if (currentNode !== null) {
          let value = currentNode.getData();
          currentNode = currentNode.getNext();
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

  toString() {
    let sb = "[ ";
    let currentNode = this.head;
    if (this.isEmpty()) return "[]";

    while (currentNode !== null) {
      sb += currentNode.getData();
      if (currentNode.getNext() !== null) sb += ", ";
      currentNode = currentNode.getNext();
    }
    sb += " ]";
    return sb;
  }
}

export default DoublyLinkedList;

// let dll = new DoublyLinkedList();
// dll.add(1);
// dll.add(2);
// dll.add(3);

// console.log(dll.toString()); // [ 1, 2, 3 ]

// dll.removeAt(1);
// console.log(dll.toString()); // [ 1, 3 ]

// console.log(dll.peekFirst()); // 1
// console.log(dll.peekLast()); // 3

// dll.addFirst(0);
// console.log(dll.toString()); // [ 0, 1, 3 ]

// dll.addLast(4);
// console.log(dll.toString()); // [ 0, 1, 3, 4 ]

// console.log(dll.contains(1)); // true

// console.log(dll.indexOf(4)); // 3
