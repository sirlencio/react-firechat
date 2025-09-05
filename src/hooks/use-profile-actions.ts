import { updateProfile } from "firebase/auth";
import { useState } from "react"
import { useUser } from "reactfire";

export const useProfileActions = () => {

    const [loading, setLoading] = useState(false);
    const { data: user } = useUser();

    const updateUserProfile = async (data: {
        displayName?: string,
        photoURL?: string,
    }) => {
        if (!user) {
            throw new Error("Error is not authenticated")
        }

        setLoading(true);
        try {
            await updateProfile(user, {
                displayName: data.displayName || user.displayName,
                photoURL: data.photoURL || user.photoURL,
            })
            return {success: true}
        } catch (error) {
            console.error("Error updating profile", error);
            return {success: false}
        } finally {
            setLoading(false);
        }
    }

    return {
        updateUserProfile,
        loading,
    }

}