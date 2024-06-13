import CircularArrayBasedQueue from "./CircularArrayBasedQueue.js";
import LinkedListBasedQueue from "./LinkedListBasedQueue.js";

const testQueue = () => {
  const numberOfOperations = 1000000;

  const circularArrayBasedQueue = new CircularArrayBasedQueue(
    numberOfOperations
  );
  let startTime = process.hrtime.bigint();
  for (let i = 0; i < numberOfOperations; i++) {
    circularArrayBasedQueue.enQueue(i);
  }
  for (let i = 0; i < numberOfOperations / 2; i++) {
    circularArrayBasedQueue.deQueue(i);
  }
  for (let i = 0; i < numberOfOperations / 4; i++) {
    circularArrayBasedQueue.enQueue(i);
  }

  for (let i = 0; i < (3 * numberOfOperations) / 4; i++) {
    circularArrayBasedQueue.deQueue(i);
  }
  let endTime = process.hrtime.bigint();
  const arrayTime = endTime - startTime;
  console.log("Circular array based queue took: " + arrayTime + "\n");

  const linkedListBaseQueue = new LinkedListBasedQueue();
  startTime = process.hrtime.bigint();
  for (let i = 0; i < numberOfOperations; i++) {
    linkedListBaseQueue.enqueue(i);
  }
  for (let i = 0; i < numberOfOperations; i++) {
    linkedListBaseQueue.deQueue();
  }
  endTime = process.hrtime.bigint();
  let linkedListTime = endTime - startTime;
  console.log("Linked list based queue took: " + linkedListTime + "\n");
  console.log("The difference: " + (linkedListTime - arrayTime) + "\n");
};

export default testQueue;
