import type { Message } from "@/schema/room.schema";
import { useUser } from "reactfire";
import FriendEmail from "./friend-email";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

interface Props {
  message: Message;
}

const MessageChat = ({ message }: Props) => {
  const { data: user } = useUser();
  const isFriend = message.senderId !== user?.uid;

  return (
    <div
      className={cn(
        "max-w-[250px] md:max-w-[300px] p-2 rounded",
        isFriend ? "bg-pink-200" : "bg-green-200 ml-auto"
      )}
    >
      <div>
        <div className="grid grid-cols-2">
          <p className="mr-auto">{message.text}</p>
          <img
            src={
              user?.photoURL
                ? user?.photoURL
                : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }
            className="rounded-4xl max-h-7 max-w-7 ml-auto outline-2 mr-1 mt-1"
            alt="icon"
          />
        </div>
      </div>
      <p className="truncate text-xs mt-3">
        {isFriend ? (
          <Suspense fallback={<div>Cargando user info..</div>}>
            <FriendEmail friendUID={message.senderId} />
          </Suspense>
        ) : (
          user.email
        )}
      </p>
    </div>
  );
};

export default MessageChat;
