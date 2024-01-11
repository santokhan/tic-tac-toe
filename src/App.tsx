import { useState } from 'react'
import './App.css'
import Square from './components/Square'
import calculateWinner from './lib/calculateWinner';
import GameTitle from './components/GameTitle';
import HistoryButton from './components/HistoryButton';
import { v4 } from 'uuid';

export type Square = string
export type Squares = Square[]
export type History = Squares[]

const App = () => {
	const [squares, setsquares] = useState<Squares>(Array(9).fill(null));
	const [xIsNext, setxIsNext] = useState<boolean>(true);
	const [winner, setwinner] = useState<string | null>(null);

	const [history, sethistory] = useState<History>([Array(9).fill(null)]);
	const [currentMove, setcurrentMove] = useState<number>(history.length - 1);

	function onSquareClick(id: number) {
		if (squares[id] || winner) return;

		const newSquares = squares.slice()
		newSquares[id] = xIsNext ? "X" : "O"

		setsquares(newSquares);
		setxIsNext(!xIsNext);
		setwinner(calculateWinner(newSquares));
		sethistory([...history.slice(0, currentMove + 2), newSquares]);
		setcurrentMove(history.length - 1);
	}

	function onNavigate(id: number) {
		setsquares(history[id])
		setxIsNext(id % 2 === 0)
		setwinner(calculateWinner(history[id]));
		setcurrentMove(id - 1);
	}

	return (
		<main className="min-h-screen p-4 flex flex-col items-center bg-indigo-950 text-gray-50">
			<section className="flex flex-col gap-12 mt-12">
				<div className="w-56 space-y-2">
					<GameTitle>{winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}</GameTitle>
					<div className="bg-gradient-to-r from-indigo-500 to-blue-500 w-56 h-56 grid grid-cols-3 grid-rows-3">
						{squares.map((square: Square, idx) =>
							<Square key={v4().slice(0, 8)} value={square} onSquareClick={() => { onSquareClick(idx) }} />
						)}
					</div>
				</div>
				<div className="space-y-2">
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
