import { CounterContext } from "../../context/contexts";
import { use } from "react";

export function CounterSummary(props) {
    // const [contextData, increment] = useContext(CounterContext); -- OLD WAY
    const [contextData, increment] = use(CounterContext);
    return (
        <>
            <section>
                {
                    contextData.map((counter, index) => (
                        <p key={counter.id}>{counter.name} Count: {counter.count}</p>
                    ))
                }
            </section>
        </>
    )
}

export function CounterSummary2(props) {
    const counterData = use(CounterContext);
    return (
        <>
            <section>
                {
                    counterData.map((counter, index) => (
                        <p key={counter.id}>{counter.name} Count: {counter.count}</p>
                    ))
                }
            </section>
        </>
    )
}