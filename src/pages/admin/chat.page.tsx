import FormMessageChat from "@/components/chat/form-message-chat";
import FomrSearchFriend from "@/components/chat/form-search-friend";
import ListRoomChat from "@/components/chat/list-room-chat";
import MessagesChat from "@/components/chat/messages-chat";
import { Suspense, useState } from "react";

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");

  const handleClickRoomId = (id: string) => {
    setRoomId(id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <section className="space-y-4">
        <Suspense fallback={<div>Cargando rooms...</div>}>
          <FomrSearchFriend handleClickRoomId={handleClickRoomId}/>
          <ListRoomChat handleClickRoomId={handleClickRoomId} />
        </Suspense>
      </section>
      <section>
        {roomId ? (
          <Suspense fallback={<div>Cargando mensajes...</div>}>
            <FormMessageChat roomId={roomId}/>
            <MessagesChat roomId={roomId} />
          </Suspense>
        ) : (
          <div>Selecciona una sala para chatear</div>
        )}
      </section>
    </div>
  );
};

export default ChatPage;
