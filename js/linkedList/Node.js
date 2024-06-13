class Node {
  constructor(data, prev = null, next = null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  getPrev() {
    return this.prev;
  }

  setPrev(prev) {
    this.prev = prev;
  }

  getNext() {
    return this.next;
  }

  setNext(next) {
    this.next = next;
  }

  toString() {
    return this.data.toString();
  }
}

export default Node;
