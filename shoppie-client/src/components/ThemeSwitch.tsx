// 'use client'
// import React, { useEffect, useState } from "react";
// import { useTheme } from "next-themes";
// import MoonIcon from "./shared/Icons/MoonIcon";
// import SunIcon from "./shared/Icons/SunIcon";
// import {FiSun, FiMoon} from "react-icons/fi"
// import Image from "next/image";

// const ThemeSwitcher: React.FC = () => {
//   const [mounted, setMounted] = useState(false);
//   const { theme, setTheme } = useTheme();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }

//   const toggleTheme = (newTheme: string) => {
//     setTheme(newTheme);
//   };

//   return (
//     <div className="flex items-center">
//       <button
//         className="flex items-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
//         onClick={() => toggleTheme("dark")}
//       >
//         <MoonIcon className="w-5 h-5 text-yellow-400" />
//       </button>
//       <button
//         className="flex items-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
//         onClick={() => toggleTheme("light")}
//       >
//         <SunIcon className="w-5 h-5 text-yellow-400" />
//       </button>
//     </div>
//   );
// };

// export default ThemeSwitcher;
'use client'

import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() =>  setMounted(true), [])

  if (!mounted) return (
    <Image
      src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
      width={36}
      height={36}
      sizes="36x36"
      alt="Loading Light/Dark Toggle"
      priority={false}
      title="Loading Light/Dark Toggle"
    />
  )

  if (resolvedTheme === 'dark') {
    return <FiSun onClick={() => setTheme('light')} />
  }

  if (resolvedTheme === 'light') {
    return <FiMoon onClick={() => setTheme('dark')} />
  }

}