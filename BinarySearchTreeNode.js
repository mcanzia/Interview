import BinaryTreeNode from "./BinaryTreeNode";

export default class BinarySearchTreeNode extends BinaryTreeNode {
    constructor(value = null) {
        super(value)
    }

    insert(value) {
        if (value === null) {
            this.value = value;
            return this;
        }

        const newNode = new BinarySearchTreeNode(value);
        if (value < this.value) {
            if (this.left) {
                return this.left.insert(value);
            }

            this.setLeft(newNode);
            return newNode;
        }
        if (value > this.value) {
            if (this.right) {
                return this.right.insert(value);
            }
            this.setRight(newNode);
            return newNode;
        }

        return this;
    }

    find(value) {
        if (this.value === value) {
            return this;
        }

        if (value < this.value && this.left) {
            return this.left.find(value);
        }

        if (value > this.value && this.right) {
            return this.right.find(value);
        }

        return null;
    }

    contains(value) {
        return !!this.find(value);
    }

    remove(value) {
        const nodeToRemove = this.find(value);

        if (!nodeToRemove) {
            throw new Error('Item not found in the tree');
        }

        const { parent } = nodeToRemove;

        if (!nodeToRemove.left && !nodeToRemove.right) {
            // Node is a leaf and thus has no children.
            if (parent) {
                // Node has a parent. Just remove the pointer to this node from the parent.
                parent.removeChild(nodeToRemove);
            } else {
                // Node has no parent. Just erase current node value.
                nodeToRemove.setValue(undefined);
            }
        } else if (nodeToRemove.left && nodeToRemove.right) {
            // Node has two children.
            // Find the next biggest value (minimum value in the right branch)
            // and replace current value node with that next biggest value.
            const nextBiggerNode = nodeToRemove.right.findMin();
            if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
                this.remove(nextBiggerNode.value);
                nodeToRemove.setValue(nextBiggerNode.value);
            } else {
                // In case if next right value is the next bigger one and it doesn't have left child
                // then just replace node that is going to be deleted with the right node.
                nodeToRemove.setValue(nodeToRemove.right.value);
                nodeToRemove.setRight(nodeToRemove.right.right);
            }
        } else {
            // Node has only one child.
            // Make this child to be a direct child of current node's parent.
            /** @var BinarySearchTreeNode */
            const childNode = nodeToRemove.left || nodeToRemove.right;

            if (parent) {
                parent.replaceChild(nodeToRemove, childNode);
            } else {
                BinaryTreeNode.copyNode(childNode, nodeToRemove);
            }
        }

        // Clear the parent of removed node.
        nodeToRemove.parent = null;

        return true;
    }


}