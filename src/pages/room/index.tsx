/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { socket } from "../../socket";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { User, playersInRoom } from "../../states/global";

function Room() {
  const { roomid } = useParams();
  const [players, setPlayers] = useAtom(playersInRoom);

  console.log("players", players);
  useEffect(() => {
    socket.on(
      "joined-room",
      (data: { joinedPlayers: User[]; roomId: string }) => {
        setPlayers(data.joinedPlayers);
      }
    );

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      Room {roomid}
      <div>
        JOINED PLAYERS{" "}
        {JSON.stringify(players)}
      </div>
    </div>
  );
}

export default Room;
