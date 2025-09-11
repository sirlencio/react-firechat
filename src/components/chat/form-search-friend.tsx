import {
  emailFriendZodSchema,
  type emailFriendZodSchemaType,
} from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTransition } from "react";
import { useRoomActions } from "@/hooks/use-room-actions";
import { toast } from "sonner";

interface Props {
    handleClickRoomId: (id: string) => void
}

const FomrSearchFriend = ({handleClickRoomId}: Props) => {

    const [isLoading, startTransition] = useTransition()
    const {findOrCreateRoom} = useRoomActions();

  const form = useForm<emailFriendZodSchemaType>({
    resolver: zodResolver(emailFriendZodSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: emailFriendZodSchemaType) {
    startTransition(async() => {
        const response = await findOrCreateRoom(values.email)
        if (response.success){
            handleClickRoomId(response.roomId)
            toast.success("Friend encontrado, comienza a chatear");
            form.reset();
            return;
        }
        toast.error(response.message);

    });
}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="@mail.com" type="email"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"outline"} className="w-full" disabled={isLoading}>{isLoading ? "Buscando friend..." : "Buscar"}</Button>
      </form>
    </Form>
  );
};

export default FomrSearchFriend;
