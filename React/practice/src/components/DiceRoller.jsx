import { useState } from 'react';

export default function App() {
    const [numDice, setNumDice] = useState(1);
    const [diceResults, setDiceResults] = useState([]);

    function handleSetNumDice(e) {
        const dice = Number(e.target.value);
        setNumDice(dice);
    }

    function handleRoll() {
        const newDiceResults = Array.from({ length: numDice }).map(() => Math.floor(Math.random() * 6) + 1);
        setDiceResults(newDiceResults);
    }

    return (
        <>
            <RollForm numDice={numDice} handleSetNumDice={handleSetNumDice} handleRoll={handleRoll} />
            {diceResults.length ? <DiceRolls diceResults={diceResults} /> : null}
        </>
    )
}

function RollForm({ numDice, handleSetNumDice, handleRoll }) {
    return (
        <>
            <div className="rollForm">
                <div className="rollForm__input">
                    <label htmlFor="numDiceInput">Number of Dice</label>
                    <input id="numDiceInput" name="numDiceInput" type="number" min="1" max="12" value={numDice} onChange={handleSetNumDice}></input>
                </div>
                <button onClick={handleRoll}>Roll</button>
            </div>
        </>
    )
}

function DiceRolls({ diceResults }) {
    return (
        <>
            <fieldset class="resultMap">
                {
                    diceResults.map((value, index) => (
                        <fieldset className="die" key={index}>
                            <div>{value}</div>
                        </fieldset>
                    ))
                }
            </fieldset>
        </>
    )
}
