import Head from "next/head";

import { ContactForm } from "@/components/contactForm";

export default function Home() {

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center xl:pt-44 pt-32">
        <ContactForm />
      </main>
    </>
  );
}

