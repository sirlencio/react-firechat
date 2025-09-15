import type { LastMessage, Message } from "@/schema/room.schema";
import { addDoc, collection, doc, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"

export const useMessagesActions = (roomId: string) => {
    const { data: user } = useUser()
    const db = useFirestore();

    const messagesRef = collection(db, "rooms", roomId, "messages")

    const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"))

    const { data: messages } = useFirestoreCollectionData(messagesQuery, {
        suspense: true,
        idField: "id"
    })

    const sendMessage = async (text: string) => {
        if (!user) throw new Error("useMessagesActions: 401")

        const timestamp = serverTimestamp();

        const messageData: Omit<Message, "id"> = {
            senderId: user.uid,
            text,
            timestamp,
        }

        const roomRef = doc(db, "rooms", roomId);
        const lastMessage: LastMessage = {
            senderId: user.uid,
            text,
            timestamp
        }

        await Promise.all([
            addDoc(messagesRef, messageData),
            updateDoc(roomRef, {lastMessage})
        ])
    }

    return {
        messages: messages as Message[],
        sendMessage
    }
}