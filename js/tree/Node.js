class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  getLeft() {
    return this.left;
  }

  setLeft(left) {
    this.left = left;
  }

  getRight() {
    return this.right;
  }

  setRight(right) {
    this.right = right;
  }

  toString() {
    return this.data.toString();
  }
}

export default Node;
