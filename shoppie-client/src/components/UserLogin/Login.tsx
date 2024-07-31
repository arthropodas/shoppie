"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { userService } from "@/src/services/apiUrls";
import { useShoppieStore } from "@/src/store/shoppieStore";
import Swal from "sweetalert2";
import Link from "next/link";
import { useForm } from "react-hook-form";
import GoogleButton from "react-google-button";
import useGoogleSignIn from "../GoogleSignIn";
import { FaEye } from "react-icons/fa";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { FaEyeSlash } from "react-icons/fa";

const Schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const { googleData } = useGoogleSignIn();
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<FormData>({
    resolver: yupResolver(Schema),
    mode: "onChange",
  });
  const { login } = useShoppieStore();

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  const LoginForm = async (data: FormData) => {
    try {
      const res = await userService.login(data);
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/");
        login();
        const tokens = JSON.stringify(res.data);
        console.log(res.data);
        localStorage.setItem("token", tokens);
      }
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid credentials",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      reset();
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Image
            src="/images/shoppielogo.png"
            alt="shoppielogo"
            width={300}
            height={300}
            className="object-contain"
          />
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(LoginForm)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                        <FaEyeSlash className="w-5 h-5 mt-6 dark:text-white"/>
                 
                    ) : (
                      <FaEye className="w-5 h-5 mt-6 dark:text-white"/>
                    )}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href="#sdnfjn"
                    className="dark:text-white text-sm text font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled={!isValid}
                >
                  Sign in
                </button>
              </form>
              <GoogleButton onClick={googleData} />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
