import Head from "next/head";
import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { Layout } from "@/components/layout";

import logo from "/public/images/Prancheta_2GUERRAGRUPO.png"

export default function Home() {
  return (
    <>
      <Head>
        <title>Guerra consórcios</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex-1 flex flex-col md:flex-row items-center">
          <div className="hidden md:flex flex-1 items-center justify-center w-hull h-full p-20">
            <Image src={logo} alt="Grupo Guerra" priority />
          </div>
          <div className="md:px-24 flex-1 mx-auto w-4/6 max-w-5xl flex flex-col justify-center items-center gap-6 text-center">
            <div className="flex md:hidden p-8">
              <Image src={logo} alt="Grupo Guerra" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold">
              Entre em contato
            </h2>
            <ContactForm />
          </div>
        </div>
      </Layout>
    </>
  );
}

