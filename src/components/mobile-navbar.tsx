import { useState, type ReactNode } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { Menu } from "lucide-react";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "/public/images/icon.png"
import { signIn, useSession } from "next-auth/react";


export function MobileNavbar() {
  const [open, setOpen] = useState(false)
  const { status, data: session } = useSession()
  const isAuthenticated = status === "authenticated"
  const isAdmin = session && session.user.role === "ADMIN"

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost">
          <Menu size={24} />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Image src={logo} alt="Grupo Guerra" width={32} height={32} />
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {isAdmin &&
              <>
                <MobileLink
                  href="/admin/mensagens"
                  onOpenChange={setOpen}
                >
                  Mensagens
                </MobileLink>
                <MobileLink
                  href="/admin/listagens"
                  onOpenChange={setOpen}
                >
                  Gerenciar listagens
                </MobileLink>
              </>
            }
            <MobileLink
              href="/carros"
              onOpenChange={setOpen}
            >
              Carros
            </MobileLink>
            <MobileLink
              href="/motos"
              onOpenChange={setOpen}
            >
              Motos
            </MobileLink>
            <MobileLink
              href="/caminhoes"
              onOpenChange={setOpen}
            >
              Caminhões
            </MobileLink>
            {isAuthenticated &&
              <div onClick={() => signIn()}>
                Sair
              </div>
            }
            {status === "unauthenticated" &&
              <div onClick={() => signIn()}>
                Entrar
              </div>
            }


          </div>
        </ScrollArea>
      </SheetContent>

    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  className?: string
  href: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={async () => {
        await router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
