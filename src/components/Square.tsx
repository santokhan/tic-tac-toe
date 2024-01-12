export type SquareProps = {
    value: any;
    onSquareClick: () => void;
    active?: boolean;
}

const Square = ({ value, onSquareClick, active }: SquareProps) => (
    <button onClick={onSquareClick} type="button" className={[
        'shadow border border-indigo-950 w-full h-full text-4xl md:text-6xl font-bold grid place-items-center',
        active ? 'text-[#060711]' : ''
    ].join(" ")}>
        {value}
    </button>
)

export default Square;