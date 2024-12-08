"use client";
import React from "react";
import styles from "./Register.module.css";
import GoogleButton from "react-google-button";
import useGoogleSignIn from "../GoogleSignIn";
import { vendorService } from "@/src/services/apiUrls";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Link from "next/link";

interface RegisterData {
  name: string;
  address: string;
  email: string;
  password: string;
}

const Schema = Yup.object().shape({
  name: Yup.string().required("vendor Name is required"),
  address: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "ejejgj"),
});
const VendorRegister: React.FC = () => {
  const router = useRouter();

  const { googleData } = useGoogleSignIn();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(Schema),
    mode: "onChange",
  });

  const handleRegistartion = async (data: RegisterData) => {
    try {
      console.log("daata", data);
      const res = await vendorService.vendorRegister(data);
      console.log(res);
      if (res.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Vendor Registered Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/");
      }
    } catch (error:any) {
      console.log("error............",error)
      console.log("error data............",error?.response?.data?.message)

      Swal.fire({
        position: "center",
        icon: "error",
        title:error?.response?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      reset();
    }
  };
  return (
    <div className={`${styles.container} dark:bg-slate-800 dark:text-white `}>
      <div className={styles.item}>
        <div className={styles.left}>
          <img
            src="https://img.freepik.com/free-vector/business-analytics-report-data-statistics-visualization-financial-analysis-presentation-analyst-female-flat-character-holding-tablet-device_335657-2614.jpg"
            alt="register"
          />
        </div>
        <div className={`${styles.right}`}>
          <h3>Sign Up For Vendors</h3>
          <form onSubmit={handleSubmit(handleRegistartion)}>
            <div className={styles.inputGroup}>
              <input
                className="dark:placeholder-gray-400"
                type="text"
                placeholder="name"
                {...register("name")}
              />

              {errors.name && (
                <span className={styles.errors}>
                  {errors.name?.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                className=" dark:placeholder-gray-400"
                type="text"
                placeholder="address"
                {...register("address")}
              />
              {errors.address && (
                <span className={styles.errors}>{errors.address?.message}</span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                className=" dark:placeholder-gray-400"
                placeholder="email"
                {...register("email")}
              />
              {errors.email && (
                <span className={styles.errors}>{errors.email?.message}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                className=" dark:placeholder-gray-400"
                type="password"
                placeholder="password"
                {...register("password")}
              />
              {errors.password && (
                <span className={styles.errors}>
                  {errors.password?.message}
                </span>
              )}
            </div>
            <button disabled={!isValid}>Sign Up</button>
          </form>
          <GoogleButton
            style={{
              width: "27vh",
              marginTop: "15px",
              fontFamily: "inherit",
            }}
            onClick={googleData}
          />
          <p style={{ marginTop: "10px", fontSize: "13px" }}>
            Already have an account ?{" "}
            <Link href="/login">
              <span style={{ color: "blue" }}>Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
