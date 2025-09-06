import { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

const rowStyle = {
    display: 'flex'
}

const squareStyle = {
    'width': '60px',
    'height': '60px',
    'backgroundColor': '#ddd',
    'margin': '4px',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'fontSize': '20px',
    'color': 'white'
}

const boardStyle = {
    'backgroundColor': '#eee',
    'width': '208px',
    'alignItems': 'center',
    'justifyContent': 'center',
    'display': 'flex',
    'flexDirection': 'column',
    'border': '3px #eee solid'
}

const containerStyle = {
    'display': 'flex',
    'alignItems': 'center',
    'flexDirection': 'column'
}

const instructionsStyle = {
    'marginTop': '5px',
    'marginBottom': '5px',
    'fontWeight': 'bold',
    'fontSize': '16px',
}

const buttonStyle = {
    'marginTop': '15px',
    'marginBottom': '16px',
    'width': '80px',
    'height': '40px',
    'backgroundColor': '#8acaca',
    'color': 'white',
    'fontSize': '16px',
}

function Square({ value, onSquareClick }) {
    return (
        <div
            className="square"
            style={squareStyle}
            onClick={onSquareClick}>
            {value}
        </div>
    );
}

function Board({ squares, currentPlayer, winner, onSquareClick, handleReset }) {
    const triple = [0, 1, 2];

    return (
        <div style={containerStyle} className="gameBoard">
            <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{currentPlayer}</span></div>
            {winner && (
                <div id="winnerArea" className="winner" style={instructionsStyle}>
                    Winner: <span>{winner}</span>
                </div>
            )}
            <button onClick={handleReset} style={buttonStyle}>Reset</button>
            <div style={boardStyle}>
                {triple.map((row) => (
                    <div className="board-row" style={rowStyle} key={row}>
                        {triple.map((col) => {
                            const idx = row * 3 + col;
                            return (
                                <Square
                                    key={idx}
                                    value={squares[idx]}
                                    onSquareClick={() => onSquareClick(idx)} />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Game() {
    const [squares, setSquares] = useState(Array(9).fill(""));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [winner, setWinner] = useState("");

    const nextPlayer = useMemo(() => {
        return currentPlayer === "X" ? "O" : "X";
    }, [currentPlayer]);

    function handleNextTurn(index) {
        if (squares[index] || winner !== "") return;

        const newSquares = [...squares];
        newSquares[index] = currentPlayer;
        setSquares(newSquares);

        const result = checkWinner(newSquares, index);
        if (result?.winner) {
            setWinner(result.winner);
            return;
        }

        setCurrentPlayer(nextPlayer);
    }

    function checkWinner(squares, i) {
        const player = squares[i];
        if (!player) return null;

        const row = Math.floor(i / 3);
        const col = i % 3;

        const linesToCheck = [
            [row * 3, row * 3 + 1, row * 3 + 2],
            [col, col + 3, col + 6],
        ];

        // Check diagonals
        if (row === col) linesToCheck.push([0, 4, 8]);
        if (row + col === 2) linesToCheck.push([2, 4, 6]);

        for (const line of linesToCheck) {
            if (line.every(idx => squares[idx] === player)) {
                return { winner: player, line };
            }
        }

        if (squares.every(Boolean)) return { winner: null, tie: true };
        return null;
    }

    function handleReset() {
        setSquares(Array(9).fill(""));
        setWinner("");
        setCurrentPlayer("X");
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={squares}
                    currentPlayer={currentPlayer}
                    winner={winner}
                    onSquareClick={handleNextTurn}
                    handleReset={handleReset}
                />
            </div>
        </div>
    );
}

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<Game />);