"use client";
import React from "react";
import "./globals.css";
import Header from "@/src/components/Home/Header";
import { usePathname } from "next/navigation";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>) {
  const pathname = usePathname();


  console.log(pathname);

  console.log(pathname);

  console.log(pathname);

  console.log(pathname);


 
  
 
  return (
    <html lang="en">
 
     
       <head><title>Shoppie</title>
       <link rel="icon" href="/shoppie.ico" />
       </head>

      <body>
        <Providers>

      {pathname !== '/login' && pathname !== '/register' && <Header />}

        {children}
        </Providers>
     
      </body>
    </html>
  );
}
