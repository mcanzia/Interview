import { forwardRef } from "react";
import { useReducer, useState, useEffect, useRef, useContext, use } from "react";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { useId } from "react";
import { memo } from "react";
import { CounterContext, CounterDispatchContext } from "../../../context/contexts";
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

export function CounterRef(props) {
    const numOfClicksRef = useRef({ total: 0 });

    function incrementClicks() {
        numOfClicksRef.current.total = numOfClicksRef.current.total + 1;
        alert(`You clicked ${numOfClicksRef.current.total} times`);
    }

    return (
        <article>
            <h2>Counter {props.name}</h2>
            {/* Won't Work */}
            <p>You clicked {numOfClicksRef.total} times</p>
            <button className="button" onClick={incrementClicks}>Click Me</button>
        </article>
    );
}

export function CounterRefDom(props) {
    const [clicks, setClicks] = useState(0);

    const buttonRef = useRef();

    useEffect(() => {
        buttonRef.current.focus();
    }, []);

    function incrementClicks() {
        setClicks(clicks + 1);
    }

    return (
        <article>
            <h2>Counter {props.name}</h2>
            <p>You clicked {clicks} times</p>
            <button ref={buttonRef} className="button" onClick={incrementClicks}>Click Me</button>
        </article>
    );
}

// Old Way -- React 19 onward can just pass ref as another prop
export const CounterForwardRef = forwardRef(function CounterRefDom(props, buttonRef) {
    const [clicks, setClicks] = useState(0);

    function incrementClicks() {
        setClicks(clicks + 1);
    }

    return (
        <article>
            <h2>Counter {props.name}</h2>
            <p>You clicked {clicks} times</p>
            <button ref={buttonRef} className="button" onClick={incrementClicks}>Click Me</button>
        </article>
    );
});

// Custom Hooks

function useCounter() {
    const [clicks, setClicks] = useState(0);

    function increment() {
        setClicks(clicks + 1);
    }

    return [clicks, increment];
}

export function CounterCustomHook(props) {
    const [clicks, increment] = useCounter();

    const updateTitle = useDocumentTitle("Clicks: " + clicks);

    return (
        <article>
            <h2>Counter {props.name}</h2>
            <p>You clicked {clicks} times</p>
            <button className="button" onClick={increment}>Click Me</button>
        </article>
    );
}

export function CounterProp(props) {

    return (
        <>
            <dt>Counter {props.counter.name}</dt>
            <dd>You clicked {props.counter.count} times</dd>
            {props.counter.count < 5 &&
                <dd>
                    <button className="button" onClick={props.increment}>Click Me</button>
                </dd>
            }
        </>
    );
}

export function CounterProvide(props) {
    // const [contextData, increment] = useContext(CounterContext); -- OLD WAY
    const [contextData, increment] = use(CounterContext);
    return (
        <>
            <dt>Counter {props.counter.name}</dt>
            <dd>You clicked {props.counter.count} times</dd>
            {props.counter.count < 5 &&
                <dd>
                    <button className="button" onClick={() => increment(props.index)}>Click Me</button>
                </dd>
            }
        </>
    );
}

export function CounterId(props) {
    const [contextData, increment] = use(CounterContext);
    const id = useId();
    return (
        <fieldset id={id}>
            <legend id={id + '-legend'}>Counter {props.counter.name}</legend>
            <p>You clicked {props.counter.count} times</p>
            {props.counter.count < 5 &&
                <button id={id + '-button'} className="button" onClick={() => increment(props.index)}>Click Me</button>
            }
        </fieldset>
    );
}

// Don't use memo when using Context, since Context bypasses props
export const CounterMemoDetail = memo(function CounterMemo(props) {
    const [clicks, setClicks] = useState(0);

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
})

export function CounterContextReducer({ counter }) {
    const counterData = use(CounterContext);
    const counterDispatch = use(CounterDispatchContext);
    const id = useId();

    function handleIncrement(event) {
        counterDispatch({ type: 'increment', id: counter.id });
        event.preventDefault();
    }
    return (
        <fieldset id={id}>
            <legend id={id + '-legend'}>Counter {counter.name}</legend>
            <p>You clicked {counter.count} times</p>
            {counter.count < 5 &&
                <button id={id + '-button'} className="button" onClick={handleIncrement}>Click Me</button>
            }
        </fieldset>
    );
}