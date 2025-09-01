import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CardFooterAuth from "@/components/ui/card-footer-auth";
import { useAuthActions } from "@/hooks/use-auth-actions";

const LoginPage = () => {
  const {loading} = useAuthActions();
  
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to your account using email and password or with Google</CardDescription>
      </CardHeader>
      <CardContent>
        ...
      </CardContent>
      <CardFooterAuth type="login" loading={loading}/>
    </Card>
  );
};

export default LoginPage;
