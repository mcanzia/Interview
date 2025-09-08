import { CounterObject } from "../models/counterObject";
export function counterReducer(counterData, action) {
    switch (action.type) {
        case 'increment':
            return counterData.map((counter) => {
                if (counter.id === action.id) {
                    return { ...counter, count: counter.count + 1 }
                } else {
                    return counter;
                }
            })
        case 'decrement':
            return counterData.map((counter) => {
                if (counter.id === action.id) {
                    return { ...counter, count: counter.count - 1 }
                } else {
                    return counter;
                }
            })
        case 'add':
            const newCounter = new CounterObject(counterData[counterData.length - 1].id + 1, action.data.name, true, action.data.count);
            return [...counterData, newCounter]
        default:
            console.log("ERROR")
    }
}