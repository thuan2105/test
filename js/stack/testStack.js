import ArrayBaseStack from "./ArrayBasedStack.js";
import LinkedListBasedStack from "./LinkedListBasedStack.js";

const testStack = () => {
  const numberOfOperations = 1000000;

  const arrayBaseStack = new ArrayBaseStack(10);
  let startTime = process.hrtime.bigint();
  for (let i = 0; i < numberOfOperations; i++) {
    arrayBaseStack.push(i);
  }
  for (let i = 0; i < numberOfOperations; i++) {
    arrayBaseStack.pop();
  }
  let endTime = process.hrtime.bigint();
  console.log("Array based stack took: " + (endTime - startTime) + "\n");

  const linkedListBasedStack = new LinkedListBasedStack();
  startTime = process.hrtime.bigint();
  for (let i = 0; i < numberOfOperations; i++) {
    linkedListBasedStack.push(i);
  }
  for (let i = 0; i < numberOfOperations; i++) {
    linkedListBasedStack.pop();
    endTime = process.hrtime.bigint();
  }
  console.log("Linked list based stack took: " + (endTime - startTime) + "\n");
};

export default testStack;
