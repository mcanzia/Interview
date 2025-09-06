class LinkedListNode {
    constructor(val, next = null) {
        this.value = value;
        this.next = next;
    }
}

export default class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(val) {
        let newNode = new LinkedListNode(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        this.tail.next = newNode;
        this.tail = newNode;
        return this;
    }

    prepend(val) {
        let newNode = new LinkedListNode(val);
        newNode.next = this.head;
        this.head = newNode;
        if (!this.tail) {
            this.tail = newNode;
        }
        return this;
    }

    insert(val, index) {
        const index = rawIndex < 0 ? 0 : rawIndex;
        if (index === 0) {
            this.prepend(val);
        } else {
            let count = 1;
            let currentNode = this.head;
            const newNode = new LinkedListNode(val);
            while (currentNode) {
                if (count === index) break;
                currentNode = currentNode.next;
                count += 1;
            }
            if (currentNode) {
                newNode.next = currentNode.next;
                currentNode.next = newNode;
            } else {
                if (this.tail) {
                    this.tail.next = newNode;
                    this.tail = newNode;
                } else {
                    this.head = newNode;
                    this.tail = newNode;
                }
            }
        }
        return this;

    }

    contains(val) {
        let current = this.head;
        while (current) {
            if (current.value === val) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    remove(val) {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;
        let current = this.head;
        while (current.next) {
            if (current.next.value === val) {
                deletedNode = current.next;
                current.next = current.next.next;
            } else {
                current = current.next;
            }
        }

        if (this.tail.value === val) {
            this.tail = current;
        }

    }

    removeHead() {
        if (!this.head) {
            return null;
        }

        let deletedNode = this.head;
        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }
        return deletedNode;
    }

    removeTail() {
        let deletedNode = this.tail;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        this.tail = current;
        return deletedNode;
    }
}