import LinkedList from "./linkedList"
export default class Queue {
    constructor() {
        this.linkedList = new LinkedList();
    }

    isEmpty() {
        return !this.linkedList.head;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.linkedList.head.value;
    }

    enqueue(value) {
        this.linkedList.append(value);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        let dequeuedNode = this.linkedList.removeHead();
        return dequeuedNode;
    }
}