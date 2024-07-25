// "use client";
// import { ThemeProvider } from "next-themes";
// import { useEffect, useState } from "react";

// const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return (
//       <ThemeProvider>
//         {children}
//       </ThemeProvider>
//     );
//   }

//   return <>{children}</>;
// };

// export default Providers;

"use client"
import { ThemeProvider } from "next-themes";
export function Providers({children}:{children:React.ReactNode}){
    return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
{children}
    </ThemeProvider>

}