export default class Heap {

    constructor() {
        this.heapContainer = [];
    }

    getLeftChildIndex(parentIndex) {
        return (2 * parentIndex) + 1;
    }

    getRightChildIndex(parentIndex) {
        return (2 * parentIndex) + 2;
    }

    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }

    hasParent(childIndex) {
        return this.getParentIndex(childIndex) >= 0;
    }

    hasLeftChild(parentIndex) {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    }

    hasRightChild(parentIndex) {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    }

    leftChild(parentIndex) {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)];
    }

    rightChild(parentIndex) {
        return this.heapContainer[this.getRightChildIndex(parentIndex)];
    }

    parent(childIndex) {
        return this.heapContainer[this.getParentIndex(childIndex)];
    }

    swap(indexOne, indexTwo) {
        const tmp = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = tmp;
    }

    peek() {
        if (this.heapContainer.length === 0) {
            return null;
        }

        return this.heapContainer[0];
    }

    find(item) {
        const foundItemIndices = [];

        for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
            if (item === this.heapContainer[itemIndex]) {
                foundItemIndices.push(itemIndex);
            }
        }

        return foundItemIndices;
    }

    poll() {
        if (!this.heapContainer.length) {
            return null;
        }

        if (this.heapContainer.length === 1) {
            return this.heapContainer.pop();
        }

        const item = this.heapContainer[0];

        this.heapContainer[0] = this.heapContainer.pop();
        this.heapifyDown();

        return item;
    }

    add(item) {
        this.heapContainer.push(item);
        this.heapifyUp();
        return this;
    }

    pairIsInCorrectOrder(firstElement, secondElement) {
        throw new Error(`
      You have to implement heap pair comparison method
      for ${firstElement} and ${secondElement} values.
    `);
    }

    heapifyUp(customStartIndex) {
        let currentIndex = customStartIndex || this.heapContainer.length - 1;

        while (
            this.hasParent(currentIndex)
            && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
        ) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }

    heapifyDown() {
        // Compare the parent element to its children and swap parent with the appropriate
        // child (smallest child for MinHeap, largest child for MaxHeap).
        // Do the same for next children after swap.
        let currentIndex = 0;
        let nextIndex = null;

        while (this.hasLeftChild(currentIndex)) {
            if (
                this.hasRightChild(currentIndex)
                && this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
            ) {
                nextIndex = this.getRightChildIndex(currentIndex);
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }

            if (this.pairIsInCorrectOrder(
                this.heapContainer[currentIndex],
                this.heapContainer[nextIndex],
            )) {
                break;
            }

            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }


}