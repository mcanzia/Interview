import { useState, use } from "react"
import { CounterDispatchContext } from "../../context/contexts";
export function AddCounter() {
    const [counterName, setCounterName] = useState("");
    const [startingValue, setStartingValue] = useState(1);

    const counterDispatch = use(CounterDispatchContext);

    function handleCounterNameInput(e) {
        setCounterName(e.target.value);
    }

    function handleStartingValueInput(e) {
        setStartingValue(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        // const form = e.target;
        // const formData = new FormData(form);
        // const formJson = Object.fromEntries(formData.entries());

        counterDispatch({
            type: 'add',
            data: {
                name: counterName,
                count: Number(startingValue)
            }
        })


    }
    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <h2>Add Counter</h2>
                <p>
                    <label htmlFor="counterName">Name</label>
                    <input type="text" id="counterName" name="counterName" value={counterName} onChange={handleCounterNameInput}></input>
                </p>
                <p>
                    <label htmlFor="startingValue">Starting Value</label>
                    <input type="number" id="startingValue" name="startingValue" value={startingValue} onChange={handleStartingValueInput}></input>
                </p>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}