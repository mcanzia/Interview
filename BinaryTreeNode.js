export default class BinaryTreeNode {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.parent = null;
        this.value = value;
    }

    getLeftHeight() {
        if (!this.left) {
            return 0;
        }
        return this.left.getLeftHeight() + 1;
    }

    getRightHeight() {
        if (!this.right) {
            return 0;
        }
        return this.right.getRightHeight() + 1;
    }

    getHeight() {
        return Math.max(this.getLeftHeight(), this.getRightHeight());
    }

    getBalanceFactor() {
        return this.getLeftHeight() - this.getRightHeight();
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    setLeft(node) {
        // Detach existing left node, so we can replace it
        if (this.left) {
            this.left.parent = null;
        }

        // Set new node as the new child and make its parent the current node
        this.left = node;

        if (this.left) {
            this.left.parent = this;
        }
        return this;
    }

    setRight(node) {
        if (this.right) {
            this.right.parent = null;
        }

        this.right = node;

        if (this.right) {
            this.right.parent = this;
        }
        return this;
    }

    removeChild(nodeToRemove) {
        if (this.left && this.left === nodeToRemove) {
            this.left = null;
            return true;
        }

        if (this.right && this.right === nodeToRemove) {
            this.right = null;
            return true;
        }

        return false;
    }

    replaceChild(nodeToReplace, replacementNode) {
        if (!nodeToReplace || !replacementNode) {
            return false;
        }

        if (this.left && this.left === nodeToRemove) {
            this.left = replacementNode;
            return true;
        }

        if (this.right && this.right === nodeToRemove) {
            this.right = replacementNode;
            return true;
        }

        return false;
    }
}