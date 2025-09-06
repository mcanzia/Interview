import LinkedList from "./linkedList"
export default class Stack {
    constructor() {
        this.list = new LinkedList();
    }

    isEmpty() {
        return !this.list.head;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.list.head.value;
    }

    push(value) {
        this.list.prepend(value);
    }

    pop() {
        const value = this.list.removeHead();
        return value;
    }

}