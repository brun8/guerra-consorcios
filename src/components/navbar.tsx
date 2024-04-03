import Link from "next/link";
// import logo from "/public/LogoGGbranco_amarelo.svg"
// import Image from "next/image";

import { Button } from "@/components/ui/button";


export function Navbar() {
  return (
    <nav className="h-16 border-slate-300/15 border-b">
      <div className="h-full flex items-center xl:max-w-5xl lg:max-w-xl mx-auto">
        <div className="flex-1 pl-4">
          <Link href="/">
            {/* TODO: colocar logo */}
            {/*<Image src={logo} alt="" width={212} height={64} />*/}
            <span className="text-3xl font-bold">
              logo
            </span>
          </Link>
        </div>
        <div className="flex gap-16 font-semibold leading-6 text-sm items-center">
          <p className="">
            <Link href="veiculos">Veículos</Link>
          </p>
          <Link href="login">
            <Button>
              Entrar
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
