import './App.css';
import { createRoot } from 'react-dom/client';
import { CounterState, CounterReducer, CounterEffect } from './components/hooks/Hooks';
import Game from './components/TicTacToe';
import Application from './components/PhoneBook';

function App() {
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
      <CounterEffect name="one" />

    </section>
  </>)
}

export default App
