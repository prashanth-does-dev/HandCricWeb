/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { socket } from "./socket";
import Container from "./components/common/Container";
import {
  joinedRoomIdAtom,
  userAtom,
  playersInRoom,
  User,
} from "./states/global";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const [joinedRoomId, setJoinedRoomId] = useAtom(joinedRoomIdAtom);
  const setPlayersInRoom = useSetAtom(playersInRoom);

  console.log("socket connection active", socket.connected);

  function onConnect() {
    console.log("Connected");
  }

  function onDisconnect() {
    console.log("Disconnected");
  }

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on(
      "joined-room",
      (data: { joinedPlayers: User[]; roomId: string }) => {
        setJoinedRoomId(data.roomId);
        setPlayersInRoom(data.joinedPlayers);
        navigate("/room/" + data.roomId);
      }
    );

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const HandleJoinRoom = (e: any) => {
    e.preventDefault();
    const roomId = e.target["room_id"].value;

    if (!roomId) {
      alert("Room Id is needed");
      return;
    }

    if (socket.connected === false) {
      socket
        .connect()
        .emit("join-room", { roomId, playerName: user?.username });
    } else {
      socket.emit("join-room", { roomId, playerName: user?.username });
    }
  };

  const HandleCreateRoom = () => {
    socket.connect().emit("create-room");
  };

  return (
    <Container>
      <h1 className="text-3xl font-bold text-center">
        Welcome to Hand Cricket 🏏
      </h1>
      <div>
        <img src={user?.profile_image} height={100} width={100} />
        <h3>Player: {user?.username}</h3>
        <button
          className="border-2 p-2 border-violet-500"
          onClick={HandleCreateRoom}
        >
          Create Room
        </button>


        <form onSubmit={HandleJoinRoom}>
          <input
            placeholder="Room Id"
            type="text"
            name="room_id"
            id="room_id"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button type="submit" className="border-2 p-2 border-violet-500">
            Join Room
          </button>
        </form>

        {joinedRoomId && joinedRoomId.length > 1 && (
          <button className="border-2 p-2 border-violet-500">Start Game</button>
        )}
      </div>
    </Container>
  );
}
