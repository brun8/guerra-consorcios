import Head from "next/head";

import { ContactForm } from "@/components/contactForm";

export default function Home() {

  return (
    <>
      <Head>
        <title>Guerra consórcios</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col ">
        <section className="min-h-screen">
        </section>
        <section className="flex min-h-screen items-center">
          <div className="flex-1 flex gap-28 max-w-7xl mx-auto">
            <div className="hidden xl:flex flex-col gap-6">
              <h2 className="text-5xl font-bold">Entre em contato</h2>
              <p className="text-xl">
                {/* TODO: algum texto aqui */}
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main >
    </>
  );
}

