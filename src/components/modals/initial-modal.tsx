"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import FileUpload from "@/components/file-upload";

const formSchema = z.object({
  name: z.string().min(2, { message: "Please provide a valid name" }),
  imageUrl: z.string().min(1, { message: "Please provide a valid image url" }),
});

const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome to Discord Clone! Customize your serve
          </DialogTitle>
          <DialogDescription className="text-center text-text-zinc-500">
            Give your server a personality with a name and an icon. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
               
               <FormField 
                control={form.control}
                name="imageUrl"
                render={( {field }) => (
                    <FormItem>
                        <FormControl>
                            <FileUpload
                                endpoint="serverImage"
                                value={field.value}
                                onChange={field.onChange}
                                

                            />
                        </FormControl>
                    </FormItem>
                )}
               />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-zinc-500 text-xs font-bold dark:text-secondary/70">
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-blck focus-visible:ring-offset-0"
                        disabled={isLoading}
                        placeholder="Enter a server name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading} type="submit" variant="primary">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InitialModal;