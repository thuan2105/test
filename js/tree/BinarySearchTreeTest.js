import BinarySearchTree from "./BinarySearchTree.js";
import TreeTraverseType from "./TreeTraverseType.js";

const bst = new BinarySearchTree();

bst.add(5);
bst.add(4);
bst.add(6);
bst.add(7);
bst.add(3);
bst.add(2);
bst.add(10);

// const traverse = bst.traverse(TreeTraverseType.IN_ORDER);
const traverse = bst.traverse(TreeTraverseType.PRE_ORDER);

while (traverse.hasNext()) {
  console.log(traverse.next());
}

console.log(bst.height());
console.log(bst.constants(10));
console.log(bst.constants(9));
