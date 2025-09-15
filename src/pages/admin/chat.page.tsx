import FormMessageChat from "@/components/chat/form-message-chat";
import FomrSearchFriend from "@/components/chat/form-search-friend";
import ListRoomChat from "@/components/chat/list-room-chat";
import MessagesChat from "@/components/chat/messages-chat";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Suspense, useState } from "react";

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");

  const handleClickRoomId = (id: string) => {
    setRoomId(id);
  };

  const handleBack = () => {
    setRoomId("");
  };

  return (
    <div className="container mx-auto p-4 flex h-[calc(100vh-4rem)] gap-4">
      {/* h-[calc(100vh-4rem)] = altura de viewport menos el alto del navbar */}

      {/* Columna de salas */}
      <section
        className={cn(
          "hidden md:flex flex-col w-80 border-r shadow-2xl overflow-hidden",
          roomId ? "hidden md:flex" : "flex"
        )}
      >
        <Suspense fallback={<div>Cargando rooms...</div>}>
          <div className="p-4 border-b">
            <FomrSearchFriend handleClickRoomId={handleClickRoomId} />
          </div>

          {/* Lista de salas con scroll */}
          <div className="flex-1 overflow-y-auto">
            <ListRoomChat handleClickRoomId={handleClickRoomId} />
          </div>
        </Suspense>
      </section>

      {/* Columna de chat */}
      <section
        className={cn(
          "flex flex-col flex-1 h-full shadow-2xl border-b p-4 min-h-0",
          !roomId ? "hidden md:flex" : "flex"
        )}
      >
        {roomId ? (
          <Suspense fallback={<div>Cargando mensajes...</div>}>
            {/* Botón volver solo en móvil */}
            <Button
              onClick={handleBack}
              className="md:hidden rounded px-3 py-2 mb-2"
              variant="link"
            >
              Volver a salas
            </Button>

            {/* Mensajes con scroll */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <MessagesChat roomId={roomId} />
            </div>

            {/* Formulario siempre abajo */}
            <div className="shrink-0 mt-4 border-t-2 pt-4">
              <FormMessageChat roomId={roomId} />
            </div>
          </Suspense>
        ) : (
          <div className="font-extralight self-center">
            Selecciona una sala para chatear
          </div>
        )}
      </section>
    </div>
  );
};

export default ChatPage;
