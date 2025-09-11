import type { UserFirestore } from "@/schema/user.schema";
import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";

export const useFriendInfo = (friendUID: string) => {
  const db = useFirestore();

  const friendRef = doc(db, "users", friendUID);

  const { data: friend } = useFirestoreDocData(friendRef, {
    suspense: true,
  });

  return {
    friend: friend as UserFirestore,
  };
};
