import type { Room } from "@/schema/room.schema";
import { useUser } from "reactfire";
import { Button } from "../ui/button";
import FriendEmail from "./friend-email";
import { Suspense } from "react";
import { useFriendInfo } from "@/hooks/use-friend-info";
import { cn } from "@/lib/utils";

interface Props {
  room: Room;
  handleClickRoomId: (id: string) => void;
}

const RoomChat = ({ room, handleClickRoomId }: Props) => {
  const { data: user } = useUser();

  const friendUID = room.participants.find((id) => id !== user?.uid) || "";

  const { friend } = useFriendInfo(friendUID);

  const isLastMessageFriend = room.lastMessage?.senderId === friendUID;

  return (
    <div className="flex flex-1 bg-amber-200 mx-2 my-4 px-3 py-5 rounded-2xl">
      <Button
        onClick={() => handleClickRoomId(room.id)}
        variant="link"
        className="w-full text-left"
      >
        <Suspense fallback={"Cargando info friend..."}>
          <div className="flex flex-col w-full">
            {/* Fila superior: nombre + imagen */}
            <div className="flex justify-between items-center">
              <FriendEmail friendUID={friendUID} />
              <img
                src={
                  friend?.photoURL
                    ? friend.photoURL
                    : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                }
                alt="photo"
                className="rounded-full h-8 w-8 border-b-2"
              />
            </div>

            {/* Último mensaje debajo */}
            <div className="mt-1">
              <p className={cn("text-sm truncate font-light", isLastMessageFriend ? "text-pink-400" : "text-gray-950")}>
                {room.lastMessage?.text || "No hay mensajes aún"}
              </p>
            </div>
          </div>
        </Suspense>
      </Button>
    </div>
  );
};

export default RoomChat;
