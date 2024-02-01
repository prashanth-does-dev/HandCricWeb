import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { socket } from "../../socket"
import { useAtomValue } from "jotai"
import { userAtom } from "../../states/global"

export const InGame = () => {
    const { id } = useParams()
    const [connected, setConnected] = useState(false)
    const [role, setRole] = useState("")
    const [innings, setInnings] = useState("")
    const [score, setScore] = useState(0)
    const [balls, setBalls] = useState(0)
    const user = useAtomValue(userAtom)

    useEffect(() => {
        socket.emit("join-game", { id })
    }, [id])

    useEffect(() => {
        socket.on("joined-game", (data: any) => {
            if(data.status){
                setConnected(true)
            }
        })
        socket.on("start-game", (data: any) => {
            if(data?.batsman === user?.uuid){
                setRole("batsman")
            }
            else if(data?.bowler === user?.uuid){
                setRole("bowler")
            }
            if(data?.innings){
                setInnings(data.innings)
            }
            if(data?.score){
                setScore(data.score)
            }
            if(data?.balls){
                setBalls(data.balls)
            }
        })
    }, [user, socket])

    return(
        <div style={{textAlign: "center", justifyContent: "center"}}>
            {connected === false && <text>Attempting to connect...<br/></text>}
            {connected === true && <text>Connected!<br/></text>}
            {role !== "" && <text>You are {role}<br/></text>}
            {role !== "" && 
            <div>
                <button style={{margin: "10px"}}>1</button>
                <button style={{margin: "10px"}}>2</button>
                <button style={{margin: "10px"}}>3</button>
                <button style={{margin: "10px"}}>4</button>
                <button style={{margin: "10px"}}>5</button>
                <button style={{margin: "10px"}}>6</button>
            </div>
            }
            {innings !== "" && <text>{innings}<br/></text>}
            {role !== "" && <text>Score - {score}  balls played = {balls}</text>}
        </div>
    )
}