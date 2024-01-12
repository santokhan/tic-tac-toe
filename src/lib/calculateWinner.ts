import { Squares } from "../App";

export type Winner = {
    name: string | null,
    winningLine: number[],
}

export const INITIAL_WINNER: Winner = {
    name: null,
    winningLine: [],
}

function calculateWinner(squares: Squares): Winner {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                name: squares[a],
                winningLine: lines[i],
            };
        }
    }
    return INITIAL_WINNER;
}

export default calculateWinner;