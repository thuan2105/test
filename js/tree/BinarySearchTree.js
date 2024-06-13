import TreeADT from "./TreeADT.js";
import Node from "./Node.js";
import LinkedListBasedStack from "../stack/LinkedListBasedStack.js";
import TreeTraverseType from "./TreeTraverseType.js";

class BinarySearchTree extends TreeADT {
  constructor() {
    super();
    this.nodeCount = 0;
    this.root = null;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.nodeCount;
  }

  height() {
    return this._height(this.root);
  }

  contains(element) {
    return this._contains(this.root, element);
  }

  add(element) {
    if (this.contains(element)) return false;
    this.root = this._add(this.root, element);
    this.nodeCount++;
    return true;
  }

  remove(element) {
    if (!this.contains(element)) return false;
    this.root = _remove(this.root, element);
    this.nodeCount--;
    return true;
  }

  _height(node) {
    if (node === null) return 0;
    return (
      1 + Math.max(this._height(node.getLeft()), this._height(node.getRight()))
    );
  }

  _contains(node, element) {
    if (node === null) return false;
    const result = element - node.getData();
    if (result < 0) return this._contains(node.getLeft(), element);
    else if (result > 0) return this._contains(node.getRight(), element);
    else return true;
  }

  _add(node, element) {
    if (node === null) {
      node = new Node(element);
    } else {
      if (element > node.getData()) {
        node.setRight(this._add(node.getRight(), element));
      } else {
        node.setLeft(this._add(node.getLeft(), element));
      }
    }
    return node;
  }

  _remove(node, element) {
    const result = element - node.getData();
    if (result > 0) {
      node.setRight(this._remove(node.getRight(), element));
    } else if (result < 0) {
      node.setLeft(this._remove(node.getLeft(), element));
    } else {
      if (node.getLeft() === null) {
        const rightNode = node.getRight();
        node.setData(null);
        node = null;
        return rightNode;
      } else if (node.getRight() == null) {
        const leftNode = node.getLeft();
        node.setData(null);
        node = null;
        return leftNode;
      } else {
        const tmp = this.minRight(node.getRight());
        node.setData(tmp);
        node.setRight(this._remove(node.getRight(), tmp));
      }
    }
    return node;
  }

  minRight(node) {
    while (node.getLeft() !== null) node = node.getLeft();
    return node.getData();
  }

  maxLeft(node) {
    while (node.getRight() !== null) node = node.getRight();
    return node.getData();
  }

  traverse(type) {
    switch (type) {
      case TreeTraverseType.PRE_ORDER:
        return this.preOrderTraverse();
      case TreeTraverseType.IN_ORDER:
        return this.inOrderTraverse();
      case TreeTraverseType.LEVER_ORDER:
        return this.leverOrderTraverse();
      case TreeTraverseType.POST_ORDER:
        return this.postOrderTraverse();
      default:
        return null;
    }
  }

  preOrderTraverse() {
    const expectedCount = this.nodeCount;
    const stack = new LinkedListBasedStack();
    stack.push(this.root);

    return {
      hasNext: () => {
        if (expectedCount !== this.nodeCount)
          throw new Error("ConcurrentModificationException");
        return this.root !== null && !stack.isEmpty();
      },
      next: () => {
        if (expectedCount !== this.nodeCount)
          throw new Error("ConcurrentModificationException");
        const node = stack.pop();
        if (node.getRight() !== null) stack.push(node.getRight());
        if (node.getLeft() !== null) stack.push(node.getLeft());
        return node.getData();
      },
    };
  }

  inOrderTraverse() {
    const expectedCount = this.nodeCount;
    const stack = new LinkedListBasedStack();
    stack.push(this.root);

    let trav = this.root;
    return {
      hasNext: () => {
        if (expectedCount !== this.nodeCount)
          throw new Error("ConcurrentModificationException");
        return this.root !== null && !stack.isEmpty();
      },
      next: () => {
        if (expectedCount !== this.nodeCount)
          throw new Error("ConcurrentModificationException");

        while (trav !== null && trav.getLeft() !== null) {
          stack.push(trav.getLeft());
          trav = trav.getLeft();
        }
        const node = stack.pop();
        if (node.getRight() !== null) {
          stack.push(node.getRight());
          trav = node.getRight();
        }

        return node.getData();
      },
    };
  }

  postOrderTraverse() {
    const expectedCount = this.nodeCount;
    const stackRoot = new LinkedListBasedStack();
    const stackChild = new LinkedListBasedStack();
    stackRoot.push(this.root);

    while (!stackRoot.isEmpty()) {
      const node = stackRoot.pop();
      stackChild.push(node);
      if (node.getLeft() !== null) stackRoot.push(node.getLeft());
      if (node.getRight() !== null) stackRoot.push(node.getRight());
    }

    return {
      hasNext: () => {
        if (expectedCount !== this.nodeCount)
          throw new Error("ConcurrentModificationException");
        return !stackChild.isEmpty();
      },
      next: () => {
        if (expectedCount !== this.nodeCount)
          throw new Error("ConcurrentModificationException");
        const node = stackChild.pop();
        return node.getData();
      },
    };
  }

  leverOrderTraverse() {
    return null;
  }
}

export default BinarySearchTree;
