import { ReactNode } from "react"

export type GameTitleProps = {
    children: ReactNode
}

const GameTitle = ({ children }: GameTitleProps) => (
    <p className="text-2xl font-bold text-white">{children}</p>
)

export default GameTitle;