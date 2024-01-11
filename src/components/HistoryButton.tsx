export type HistoryButtonProps = {
    id: number,
    onNavigate: () => void,
    active?: boolean
}

const HistoryButton = ({ id, onNavigate }: HistoryButtonProps) => (
    <button onClick={onNavigate} type="button"
        className={[
            "block w-full text-start px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-500 hover:to-indigo-600",
        ].join(" ")}>
        {id === 0 ? 'Go to game start' : `Go to move #${id}`}
    </button>
)

export default HistoryButton;