import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardFooterAuth from "@/components/ui/card-footer-auth";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { loginZodSchema, type LoginZodSchemaType } from "@/lib/zod.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const LoginPage = () => {
  const { loading, login } = useAuthActions();

  const form = useForm<LoginZodSchemaType>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginZodSchemaType) => {
    const response = await login(data);
    if (!response.success) {
      console.log(response);
      if (response.error?.code === "auth/invalid-login-credentials") {
        toast.error("Invalid email or password")
      }
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to your account using email and password or with Google
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooterAuth type="login" loading={loading} />
    </Card>
  );
};

export default LoginPage;
