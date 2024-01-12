import { useState } from 'react'
import './App.css'
import Square from './components/Square'
import calculateWinner, { INITIAL_WINNER, Winner } from './lib/calculateWinner';
import GameTitle from './components/GameTitle';
import HistoryButton from './components/HistoryButton';
import { v4 } from 'uuid';

export type Square = string | null
export type Squares = Square[]
export type History = Squares[]

const App = () => {
	const INITIAL_SQUARES: Squares = Array(9).fill(null)
	const [squares, setsquares] = useState<Squares>(INITIAL_SQUARES);
	const [xIsNext, setxIsNext] = useState<boolean>(true);
	const [winner, setwinner] = useState<Winner>(INITIAL_WINNER);

	const [history, sethistory] = useState<History>([INITIAL_SQUARES]);
	const [currentMove, setcurrentMove] = useState<number>(history.length - 1);

	function checkDraw(squares: Square[]): boolean {
		return !squares.includes(null) && winner === INITIAL_WINNER;
	}

	function onSquareClick(id: number) {
		if (squares[id] || winner.name) return;

		const newSquares = squares.slice()
		newSquares[id] = xIsNext ? "X" : "O"

		setsquares(newSquares);
		setxIsNext(!xIsNext);
		const newWinner = calculateWinner(newSquares);
		setwinner(newWinner);
		sethistory([...history.slice(0, currentMove + 2), newSquares]);
		setcurrentMove(history.length - 1);

		if (checkDraw(newSquares) && !newWinner.name) {
			// Handle draw condition here
			// console.log("It's a draw!");
			winner.name = "Draw";
		}
	}

	function onNavigate(id: number) {
		setsquares(history[id])
		setxIsNext(id % 2 === 0)
		const newWinner = calculateWinner(history[id]);
		setwinner(newWinner);
		setcurrentMove(id - 1);
	}

	function onRestart() {
		setsquares(INITIAL_SQUARES);
		setxIsNext(true);
		setwinner(INITIAL_WINNER);
		sethistory([INITIAL_SQUARES]);
		setcurrentMove(history.length - 1);
	}

	return (
		<main className="min-h-screen p-4 flex flex-col items-center bg-indigo-950 text-gray-50">
			<section className="flex flex-wrap md:flex-nowrap gap-12 mt-12">
				<div className="w-60 md:w-96 space-y-3">
					<GameTitle>{winner.name ? `Winner: ${winner.name}` : `Next player: ${xIsNext ? 'X' : 'O'}`}</GameTitle>
					<div className="bg-gradient-to-r from-indigo-500 to-blue-500 w-60 md:w-96 h-60 md:h-96 grid grid-cols-3 grid-rows-3">
						{squares.map((square: Square, idx) =>
							<Square key={v4().slice(0, 8)} value={square} onSquareClick={() => { onSquareClick(idx) }} active={winner.winningLine.includes(idx)} />
						)}
					</div>
					<div className="pt-2">
						<button onClick={onRestart} type="button" className="block w-full font-medium text-base px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-500 hover:to-indigo-600">Restart the game</button>
					</div>
				</div>
				<div className="space-y-3">
					<GameTitle>History({history.length})</GameTitle>
					<div className='list-decimal list-inside text-sm+ font-medium rounded-lg+ divide-y divide-indigo-950'>
						{history.map((squares: Squares, idx) =>
							<HistoryButton key={v4().slice(0, 8)} id={idx} onNavigate={() => { onNavigate(idx) }} />
						)}
					</div>
				</div>
			</section>
		</main>
	)
}

export default App;
