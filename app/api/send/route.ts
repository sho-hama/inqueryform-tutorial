import {NextResponse} from "next/server";
import {Resend} from "resend";
import {EmailTemplate} from "@/components/email-template";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {

  const formData = await request.formData();
  const username = formData.get("username") as string;
  const email = formData.get("email") as string ;
  const subject = formData.get("subject") as string;
  const content = formData.get("content") as string;
  const file = formData.get("file") as File;

  // メール送信やバケットに画像送信する場合はこの形とする必要がある
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const {data, error} = await resend.emails.send({
      from: "Acme <onbording@resend.dev>",
      to: ["shokihamana@gmail.com"],
      subject: subject,
      react: EmailTemplate({username, email, content}) as React.ReactElement,
      attachments: [{filename: file.name, content: buffer}],
    })
    if(error) {
      return NextResponse.json({error});
    }
    return NextResponse.json({data});
  } catch (e) {
    return NextResponse.json({e});
  }
}