"use client";

import React, {useEffect} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {useMailForm} from "@/hooks/useMailForm";
import {ClipLoader} from "react-spinners";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


export const MailForm = () => {
  const {form, onSubmit} = useMailForm();

  useEffect(() => {
    if(form.formState.isSubmitSuccessful)
    toast.success("メール送信に成功しました")
  }, [form.formState.isSubmitSuccessful])

  return (
    <Form {...form}>
      <ToastContainer></ToastContainer>
      <form onSubmit={form.handleSubmit(onSubmit)} className="container flex flex-col gap-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザ名</FormLabel>
              <FormControl>
                <Input placeholder="ユーザ名" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="メールアドレス" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>主題</FormLabel>
              <FormControl>
                <Input placeholder="主題" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>本文</FormLabel>
              <FormControl>
                <Textarea placeholder="本文" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field: {value, onChange, ...fieldProps} }) => (
            <FormItem>
              <FormLabel>画像ファイル</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="添付画像"
                  onChange={(event) => {
                    onChange(event.target.files)
                  }}
                  {...fieldProps}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? <ClipLoader/> : "Submit"}</Button>
      </form>
    </Form>
  );
}

