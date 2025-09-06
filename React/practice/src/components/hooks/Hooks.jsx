import { useReducer, useState, useEffect } from "react";
export function CounterReducer(props) {

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'Increment':
                return { clicks: state.clicks + 1 }
            default:
                throw new Error();
        }
    }, { clicks: 0 });

    return (
        <article>
            <h2>Counter {props.name}</h2>
            <p>You clicked {state.clicks} times</p>
            <button className="button" onClick={() => dispatch({ type: "Increment" })}>Click Me</button>
        </article>
    );
}

export function CounterState(props) {
    const [clicks, setClicks] = useState(0);

    function incrementClicks() {
        setClicks(clicks + 1);
    }

    // Use this format if you need input to be updated in real time inside the click handler
    // basically n gets incremented with each call to setClicks
    // setClicks(clicks + 1) would use the same value for clicks each time 
    // so calling it multiple times would not have any effect
    function incrementMultipleClicks() {
        setClicks(n => n + 1);
        setClicks(n => n + 1);
        setClicks(n => n + 1);
    }

    return (
        <article>
            <h2>Counter {props.name}</h2>
            <p>You clicked {clicks} times</p>
            <button className="button" onClick={incrementMultipleClicks}>Click Me</button>
        </article>
    );
}


export function CounterEffect(props) {
    const [clicks, setClicks] = useState(0);

    function setDocumentTitle() {
        document.title = "Clicks: " + clicks;

        // Returned functions from an Effect are what get triggered when the component is unmounted/destroyed
        return () => {
            console.log("Unmounting");
        }
    }

    // Effects are usually used to do an action outside of React
    // Effects are stored in a queue by the component and then all run
    // after the component is finished rendering
    // useEffect(setDocumentTitle);

    // Effect with no dependencies
    // Will not be triggered after the first time
    // useEffect(setDocumentTitle, []);

    // Only dependency is clicks
    // Will trigger whenever clicks is updated
    useEffect(setDocumentTitle, [clicks]);

    // Fetching data can also be handled in UseEffect 
    // although you have to make sure to deal with race conditions
    // It is recommended to use a 3rd party tool/solution instead for fetching data

    // UseEffect and stale closures
    const message = `Number of clicks: ${clicks}`;

    // In below effect, message is stale since effect only runs once, so clicks never update in the message
    /*
    useEffect(() => {
        setInterval(() => {
            console.log(message);
        }, 2000);
    }, []);
    */

    // Below effect corrects this by always running effect on component update
    // And also clears out interval each time so only current interval will run
    /*
    useEffect(() => {
        const id = setInterval(() => {
            console.log(message);
        }, 2000);
        return () => {
            clearInterval(id);
        }
    }, [clicks])
        */

    function incrementClicks() {
        setClicks(clicks + 1);
    }


    return (
        <article>
            <h2>Counter {props.name}</h2>
            <p>You clicked {clicks} times</p>
            <button className="button" onClick={incrementClicks}>Click Me</button>
        </article>
    );
}