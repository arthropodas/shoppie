import Themeswitcher from "../ThemeSwitch";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiLogIn, FiMoon, FiShoppingBag, FiShoppingCart } from "react-icons/fi";

const Header: React.FC = () => {
  return (
    <div className="min-h-20 dark:bg-gray-900 dark:text-white  bg-slate-100 flex flex-wrap justify-between items-center px-4">
      <div className="pl-24">
        <Image
          src="/images/shoppielogo.png" // Path relative to the public directory
          alt="Shop Logo"
          width={150}
          height={300}
        />
      </div>

      <div className="p-2 sm:p-5 w-full sm:w-1/3">
        <form className="flex items-center max-w-sm mx-auto w-full">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search branch name..."
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium  text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>

      <div className="w-full sm:w-1/3 p-2 sm:p-5 sm:justify-around">
        <span className="flex flex-wrap space-x-2 justify-around">
        <Link href='/login'>
          <button
            type="button"
            className="flex items-center p-2  border-2 rounded-lg hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"
              alt="Login Icon"
              className="w-5 h-5 mr-2"
            />
          <span className="hidden sm:inline">Login</span>
          </button>
          </Link>  
          <button
            type="button"
            className="flex  items-center p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
      

            <FiShoppingCart className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Cart</span>
          </button>
          <button
            type="button"
            className="flex items-center p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FiShoppingBag className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Become a seller</span>
          </button>
          <button>
            <Themeswitcher />
          </button>
        </span>
      </div>
    </div>
  );
};

export default Header;
