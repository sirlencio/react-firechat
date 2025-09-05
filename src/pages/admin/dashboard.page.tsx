import { Button } from "@/components/ui/button";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { useUser } from "reactfire"

const DashboardPage = () => {

  const {data: user} = useUser();
  const {logout} = useAuthActions();

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Welcome, {user!.displayName || "Guest"}</p>
      <p>Email: {user!.email || "Not provided"}</p>
      <Button onClick={logout} variant={"destructive"}>Sign out</Button>
    </div>
  )
}

export default DashboardPage