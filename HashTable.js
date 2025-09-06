import LinkedList from "./linkedList";

const defaultHashTableSize = 32;

export default class HashTable {
    constructor(hashTableSize = defaultHashTableSize) {
        this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList());
        this.keys = {};
    }

    set(key, value) {
        this.keys[key] = key;
        const bucketLinkedList = this.buckets[key];
        const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

        if (!node) {
            bucketLinkedList.append({ key, value });
        } else {
            node.value.value = value;
        }
    }

    delete(key) {
        const keyHash = this.hash(key);
        delete this.keys[key];
        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

        if (node) {
            return bucketLinkedList.delete(node.value);
        }

        return null;
    }

    get(key) {
        const bucketLinkedList = this.buckets[this.hash(key)];
        const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

        return node ? node.value.value : undefined;
    }

    has(key) {
        return Object.hasOwnProperty.call(this.keys, key);
    }

    getKeys() {
        return Object.keys(this.keys);
    }

    getValues() {
        return this.buckets.reduce((values, bucket) => {
            const bucketValues = bucket.toArray()
                .map((linkedListNode) => linkedListNode.value.value);
            return values.concat(bucketValues);
        }, []);
    }

}