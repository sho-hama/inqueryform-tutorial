import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {formSchema} from "@/lib/formSchema";
import {useCallback} from "react";
import {z} from "zod"


export const useMailForm = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), defaultValues: {
      username: "デフォルト",
      subject: "デフォルト",
      email: "shokihamana-test@gmail.com",
      content: "テストテストテストテストテスト",
      file: undefined,
    }
  });


  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    const {username, email, subject, content ,file} = values;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("content", content);
    formData.append("file", file[0]);


    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send`, {
        method: "POST",
        body: formData,
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return {form, onSubmit};
}











