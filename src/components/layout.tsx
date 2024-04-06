import { type ReactNode } from "react";

import { ResponsiveNavbar } from "./responsive-navbar";
import Head from "next/head";


type LayoutProps = {
  children?: ReactNode
  title?: string
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>
          Guerra consórcios
          {title && ` - ${title}`}
        </title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen">
        <ResponsiveNavbar />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </main>
    </>
  )
}
