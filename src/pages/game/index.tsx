import { useEffect } from "react"
import { socket } from "../../socket"
import { useNavigate } from "react-router-dom"

export const Game = () => {
    const navigate = useNavigate()

    useEffect(() => {
        socket.on("game-created", (data: any) => {
            navigate(`/game/${data.id}`)
        })
    }, [socket])

    const createGame = () => {
        socket.emit("create-game")
    }
    return(
        <button onClick={createGame}>
            create game
        </button>
    )
}