import { messageZodSchema, type messageZodSchemaType } from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMessagesActions } from "@/hooks/use-messages-actions";
import { toast } from "sonner";
import { useTransition } from "react";

interface Props {
  roomId: string;
}

const FormMessageChat = ({ roomId }: Props) => {
  const [isLoading, startTransition] = useTransition();

  const { sendMessage } = useMessagesActions(roomId);

  const form = useForm<messageZodSchemaType>({
    resolver: zodResolver(messageZodSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: messageZodSchemaType) {
    startTransition(async () => {
      try {
        await sendMessage(values.text);
        form.reset();
      } catch (error) {
        console.error(error);
        toast.error("Error sending message");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full">
        <div className="w-full mr-4">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending message..." : "Send"}
        </Button>
      </form>
    </Form>
  );
};

export default FormMessageChat;
