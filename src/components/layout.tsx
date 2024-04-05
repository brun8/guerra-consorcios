import { type ReactNode } from "react";

import { ResponsiveNavbar } from "./responsive-navbar";


type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <main className="min-h-screen">
      <ResponsiveNavbar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </main>
  )
}
