import Image from "next/image";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";

import logo from "/public/images/GG-PRETO.png"
import logo2 from "/public/images/Prancheta_2GUERRAGRUPO.png"


export default function Home() {
  return (
    <>
      <Layout>
        <div className="min-h-[720px] bg-white text-neutral-900 pt-16">
          <div
            className="
              w-full max-w-6xl mx-auto 
              flex flex-col md:flex-row md:items-center 
              md:mt-32 mt-18
            "
          >
            <div className="text-center md:text-start flex-1">
              <h1 className="text-2xl md:text-5xl font-bold">Guerra consórcios</h1>
              <p className="text-lg mt-2">
                Consulte tabela Fipe, compre e venda carros, motos e caminhões
              </p>
              <div className="flex flex-col md:flex-row gap-2 mt-4">
                <Link href="/carros">
                  <Button className="bg-blue-700 hover:bg-blue-900 text-white">Buscar carro</Button>
                </Link>
                <Link href="/motos">
                  <Button variant="outline" className="bg-transparent border-2">Buscar moto</Button>
                </Link>
              </div>
            </div>

            <div className="flex-1 hidden md:block">
              <Image src={logo} alt="Grupo Guerra" priority />
            </div>

          </div>
        </div>
        <div className="min-h-[720px] mx-auto md:mt-24 max-w-5xl flex flex-col md:flex-row items-center">
          <div className="hidden md:flex flex-1 items-center justify-center w-hull h-full p-20">
            <Image src={logo2} alt="Grupo Guerra" priority />
          </div>
          <div className="md:px-24 flex-1 mx-auto w-4/6 max-w-5xl flex flex-col justify-center items-center gap-6 text-center">
            <div className="flex md:hidden p-8">
              <Image src={logo2} alt="Grupo Guerra" />
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

