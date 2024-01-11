export type SquareProps = {
    value: any,
    onSquareClick: () => void,
}

const Square = ({ value, onSquareClick }: SquareProps) => (
    <button onClick={onSquareClick} type="button" className={['shadow border border-indigo-950 w-full h-full text-4xl font-bold grid place-items-center'].join(" ")}>
        {value}
    </button>
)

export default Square;