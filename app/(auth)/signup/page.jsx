"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation"; // For redirection

const SignUpPage = () => {
  const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(20),
  });
  const { signUp, user } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignUpSchema) });

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      await signUp({
        email,
        password,
      });
      // console.log(res);
      // if (res) {
      //   router.push("/dashboard");
      // }
      if (user) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center mt-[135px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 px-4 py-2 bg-gray-800 w-[400px] rounded-lg"
      >
        <label>Email ID</label>
        <input
          {...register("email")}
          type="email"
          placeholder="example@gmail.com"
          className="py-1 rounded-sm text-black"
        />
        <label>Password</label>
        <input
          {...register("password")}
          type="password"
          className="py-1 rounded-sm text-black"
        />
        <div className="flex flex-row justify-center w-full">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-800 rounded-md w-[50%]"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
