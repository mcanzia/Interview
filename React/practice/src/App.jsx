import './App.css';
import { createRoot } from 'react-dom/client';
import { useRef, useEffect, useState, use } from 'react';
import { CounterState, CounterReducer, CounterEffect, CounterRef, CounterRefDom, CounterForwardRef, CounterCustomHook, CounterProp, CounterProvide, CounterId, CounterMemoDetail, CounterContextReducer } from './components/counters/hooks/Hooks';
import Game from './components/TicTacToe';
import Application from './components/PhoneBook';
import { useContext } from 'react';
import { useReducer } from 'react';
import { CounterObject } from './models/counterObject';
import { CounterContext, CounterDispatchContext } from './context/contexts';
import { counterReducer } from './reducers/counterReducer';
import { CounterList, CounterList2 } from './components/counters/CounterList';
import { CounterTools, CounterTools2 } from './components/counters/CounterTools';
import { CounterSummary, CounterSummary2 } from './components/counters/CounterSummary';
import { AddCounter } from './components/counters/AddCounter';

function App() {

  // const [counterData, setCounterData] = useState([
  //   new CounterObject(1, 'A', true, 0),
  //   new CounterObject(2, 'B', true, 0),
  //   new CounterObject(3, 'C', true, 0),
  // ]);

  // Use Context + Reducer example
  const [counterData, counterDispatch] = useReducer(counterReducer, [
    new CounterObject(1, 'A', true, 0),
    new CounterObject(2, 'B', true, 0),
    new CounterObject(3, 'C', true, 0),
  ]);

  function increment(index) {
    const newData = [...counterData];
    newData[index].count = newData[index].count + 1;
    setCounterData(newData);
  }

  const contextData = [counterData, increment];

  // const ref = useRef();
  // useEffect(() => {
  //   ref.current.focus();
  // }, []);

  // <Game />
  {/* <Application /> */ }
  return (<>
    <h1>Counters</h1>
    <section>
      {/* UseReducer */}
      {/* <CounterReducer name="One"></CounterReducer> */}

      {/* UseState */}
      {/* <CounterState name="one"></CounterState> */}

      {/* UseEffect */}
      {/* <CounterEffect name="one" /> */}

      {/* UseRef */}
      {/* <CounterRef name="one" /> */}

      {/* UseRefDom */}
      {/* <CounterRefDom name="one" /> */}

      {/* UseForwardRef */}
      {/* <CounterForwardRef ref={ref} name="one" /> */}

      {/* UseCustomHook */}
      {/* <CounterCustomHook name="one" /> */}

      {/* Memo */}
      {/* <CounterMemoDetail></CounterMemoDetail> */}
    </section>

    {/* Loops */}
    {/* <dl className="counterList">
      <CounterList counterData={counterData}></CounterList>
      <CounterTools>
        <CounterSummary counters={counterData}></CounterSummary>
      </CounterTools>
    </dl> */}

    {/* Context -- OLD WAY*/}
    {/* <dl className="counterList">
      <CounterContext.Provider value={contextData}>
        <CounterList></CounterList>
        <CounterTools>
          <CounterSummary></CounterSummary>
        </CounterTools>
      </CounterContext.Provider>
    </dl> */}

    {/* Context -- Modern*/}
    {/* <dl className="counterList">
      <CounterContext value={contextData}>
        <CounterList></CounterList>
        <CounterTools>
          <CounterSummary></CounterSummary>
        </CounterTools>
      </CounterContext>
    </dl> */}

    {/** Context + Reducer */}
    <dl className="counterList">
      <CounterContext value={counterData}>
        <CounterDispatchContext value={counterDispatch}>
          <div>
            <AddCounter />
            <CounterList2></CounterList2>
            <CounterTools2>
              <CounterSummary2></CounterSummary2>
            </CounterTools2>
          </div>
        </CounterDispatchContext>
      </CounterContext>
    </dl>
  </>)
}

export default App
