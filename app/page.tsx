import {MailForm} from "@/components/MailForm/MailForm";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h2 className="font-semibold text-2xl mb-4">お問い合わせフォーム</h2>
      <MailForm></MailForm>
    </main>
  );
}
