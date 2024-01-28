/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useAtom } from "jotai";
import { socket } from "./socket";
import Container from "./components/common/Container";
import {
  joinedRoomIdAtom,
  playerAtom,
  playersInRoom,
  roomIdAtom,
} from "./states/global";

export default function App() {
  const [player, setPlayer] = useAtom(playerAtom);
  const [players, setPlayers] = useAtom(playersInRoom);
  const [roomId, setRoomId] = useAtom(roomIdAtom);
  const [joinedRoomId, setJoinedRoomId] = useAtom(joinedRoomIdAtom);

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

    socket.on("new-room", (data: string) => {
      setRoomId(data);
    });

    socket.on(
      "joined-room",
      (data: { joinedPlayers: string[]; roomId: string }) => {
        setJoinedRoomId(data.roomId);
        setPlayers(data.joinedPlayers);
      }
    );

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameChange = (e: any) => {
    setPlayer(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const HandleJoinRoom = (e: any) => {
    e.preventDefault();
    const roomId = e.target["room_id"].value;

    if (!player || !roomId) {
      alert("Player name/Room Id is needed");
      return;
    }

    if (socket.connected === false) {
      socket.connect().emit("join-room", { roomId, playerName: player });
    } else {
      socket.emit("join-room", { roomId, playerName: player });
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

      <h2>Joined Room: {joinedRoomId}</h2>
      <div>
        <h3>Player: {player}</h3>
        <h3>Players Joined: {JSON.stringify(players)}</h3>

        <input
          onChange={handleNameChange}
          placeholder="Name"
          type="text"
          name="player-name"
          id="player"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          className="border-2 p-2 border-violet-500"
          onClick={HandleCreateRoom}
        >
          Create Room
        </button>
        {roomId && <p>Created Room id: {roomId}</p>}

        <form onSubmit={HandleJoinRoom}>
          <input
            placeholder="Room Id"
            type="text"
            name="room_id"
            id="room_id"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button
            type="submit"
            className="border-2 p-2 border-violet-500"
          >
            Join Room
          </button>
        </form>

        {joinedRoomId && joinedRoomId.length > 1 && (
          <button className="border-2 p-2 border-violet-500">
            Start Game
          </button>
        )}
      </div>
    </Container>
  );
}
