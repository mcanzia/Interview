import { use } from "react";
import { CounterId, CounterProvide, CounterContextReducer } from "./hooks/Hooks";
import { CounterContext } from "../../context/contexts";
/** USE CONTEXT EXAMPLES */
export function CounterList(props) {
    // const [contextData, increment] = useContext(CounterContext); -- OLD WAY
    const [contextData, increment] = use(CounterContext);
    return (
        <>
            {
                contextData.map((value, index) => (
                    // <CounterProvide key={index} index={index} counter={value}></CounterProvide>
                    <CounterId key={value.id} index={index} counter={value}></CounterId>
                ))
            }
        </>
    );
}

/** USE CONTEXT WITH REDUCER EXAMPLES */
export function CounterList2(props) {
    const counterData = use(CounterContext);
    return (
        <>
            {
                counterData.map((value, index) => (
                    <CounterContextReducer key={value.id} counter={value}></CounterContextReducer>
                ))
            }
        </>
    );
}