import { CounterSummary2 } from "./CounterSummary"
export function CounterTools({ children }) {
    return (
        <>
            {children}
        </>
    )
}

/** USE CONTEXT WITH REDUCER EXAMPLES */
export function CounterTools2() {
    return (
        <>
            <CounterSummary2 />
        </>
    )
}