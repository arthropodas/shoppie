
"use client"
import React from 'react';
import './globals.css'
import Header from '@/src/components/Home/Header';
import { usePathname } from 'next/navigation';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  

  const pathname= usePathname();

 console.log(pathname);
 
  
 
  return (
    <html lang="en">
 
     
       <head><title>Shoppie</title>
       <link rel="icon" href="/favicon.ico" />
       </head>

        
      <body>
      {pathname !== '/login' && <Header />}
        {children}
     
      </body>
    </html>
  );
}