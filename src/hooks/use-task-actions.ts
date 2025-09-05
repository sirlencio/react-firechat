import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire"
import { collection, query, where, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import type { Task } from "@/schema/task.schema";

export const useTaskActions = () => {

    const { data: user } = useUser();

    if (!user) {
        throw new Error("User not authorized");
    }

    const db = useFirestore();
    const taskCollectionRef = collection(db, "tasks");

    const taskQuery = query(
        taskCollectionRef,
        where("userId", "==", user!.uid)
    )

    const { status, data: tasks } = useFirestoreCollectionData(taskQuery, {
        idField: "id",
        suspense: true,
    })

    //CREATE
    const createTask = async (data: {
        title: string,
        description?: string,
    }) => {
        const newTask = {
            ...data,
            completed: false,
            userId: user!.uid,
        }

        return await addDoc(taskCollectionRef, newTask)
    }

    //DELETE
    const deleteTask = async (taskId: string) => {
        const taskDoc = doc(db, "tasks", taskId);
        return await deleteDoc(taskDoc);
    }

    const toggleTaskCompletion = async (taskId: string) => {
        const task = tasks.find((task) => task.id === taskId);
        const taskDoc = doc(db, "tasks", taskId);

        if (!task){
            throw new Error("Task not found")
        }

        return await updateDoc(taskDoc, {
            completed: !task?.completed,
        })
    }

    return {
        tasks: tasks as Task[],
        isLoding: status === "loading",

        createTask,
        deleteTask,
        toggleTaskCompletion,
    }

}