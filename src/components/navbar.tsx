import Link from "next/link";
import logo from "/public/images/icon.png"
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuItem, DropdownMenuGroup, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuLabel } from "./ui/dropdown-menu";


export function Navbar() {
  const { status, data: session } = useSession()
  const isAuthenticated = status === "authenticated"
  const isAdmin = session && session.user.role === "ADMIN"

  return (
    <nav className="h-16 border-slate-300/15 border-b hidden md:block">
      <div className="h-full flex items-center xl:max-w-5xl lg:max-w-xl mx-auto">
        <div className="flex-1 pl-4">
          <Link href="/">
            <Image src={logo} alt="Grupo Guerra" width={40} height={40} priority />
          </Link>
        </div>
        <div className="flex gap-16 font-semibold leading-6 text-sm items-center">
          <p>
            <Link href="/carros">Carros</Link>
          </p>
          <p>
            <Link href="/motos">Motos</Link>
          </p>
          <p>
            <Link href="/caminhoes">Caminhões</Link>
          </p>
          {(status === "unauthenticated") &&
            <Button className="bg-indigo-400 hover:bg-indigo-300" onClick={() => signIn()}>
              Entrar
            </Button>
          }
          {isAuthenticated &&
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={session.user.image ?? ""} alt={session.user.name ?? ""} /> <AvatarFallback>
                    <div>
                    </div>
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                {isAdmin &&
                  <DropdownMenuGroup >
                    <Link href="/admin/listagens">
                      <DropdownMenuItem>
                        <span>Gerenciar listagens</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/admin/mensagens">
                      <DropdownMenuItem>
                        <span>Mensagens</span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                }
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/carros">
                    <DropdownMenuItem>
                      <span>Carros</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/motos">
                    <DropdownMenuItem>
                      <span>Motos</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/caminhoes">
                    <DropdownMenuItem>
                      <span>Caminhões</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>


            </DropdownMenu>

          }
        </div>
      </div>
    </nav >
  )
}
