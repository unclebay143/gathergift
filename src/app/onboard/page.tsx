"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signupSchema = loginSchema
  .extend({
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const defaultValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export default function AuthPage() {
  const searchParams = useSearchParams();
  const isSignupView = searchParams.get("view") === "signup";
  const mode = isSignupView ? "signup" : "login";
  const [authMode, setAuthMode] = useState<"login" | "signup">(mode);
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authMode === "signup" ? signupSchema : loginSchema),
    defaultValues,
  });

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoggingIn(true);
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/wishes",
    });

    if (response?.ok) {
      reset();
      toast.success("Login successful");
    }

    if (response?.error) {
      toast.error(response.error || "Invalid email or password");
      setIsLoggingIn(false);
    }
  };

  const { mutate, isPending: isSigningUp } = useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      confirmPassword: string;
    }) =>
      await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),

    onSuccess(data, variables, context) {
      handleLogin({
        email: variables.email,
        password: variables.password,
      }).then(() => {
        reset();
        router.push("/wishes");
      });
    },
    onError(error) {
      toast.error(error.message || "Unable to create User");
    },
  });

  const onSubmit = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (authMode == "signup") {
      return mutate(data);
    }

    return handleLogin(data);
  };

  const isAuthenticating = isSigningUp || isLoggingIn;

  return (
    <div className='flex flex-col gap-10 lg:24 items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 dark:from-purple-950 dark:via-pink-950 dark:to-indigo-950'>
      <div className='w-full max-w-md mx-4'>
        <div className='bg-white dark:bg-gray-900 shadow-2xl sm:rounded-2xl border border-gray-200 dark:border-gray-800'>
          <div className='p-8'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
                Welcome back
              </h2>
              <p className='text-gray-600 dark:text-gray-400 mt-2'>
                {authMode === "login"
                  ? "Sign in to your account"
                  : "Create your account"}
              </p>
            </div>

            <div className='flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg mb-8'>
              <button
                className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  authMode === "login"
                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
                onClick={() => setAuthMode("login")}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  authMode === "signup"
                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
                onClick={() => setAuthMode("signup")}
              >
                Sign Up
              </button>
            </div>

            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                >
                  Email address
                </label>
                <input
                  type='email'
                  id='email'
                  {...register("email")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-colors duration-200`}
                  placeholder='Enter your email'
                />
                {errors.email && (
                  <p className='mt-2 text-sm text-red-500'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  {...register("password")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-colors duration-200`}
                  placeholder='Enter your password'
                />
                {errors.password && (
                  <p className='mt-2 text-sm text-red-500'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {authMode === "signup" && (
                <div>
                  <label
                    htmlFor='confirmPassword'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
                  >
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    id='confirmPassword'
                    {...register("confirmPassword")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-700"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-colors duration-200`}
                    placeholder='Confirm your password'
                  />
                  {errors.confirmPassword && (
                    <p className='mt-2 text-sm text-red-500'>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              )}

              <button
                disabled={isAuthenticating}
                type='submit'
                className='disabled:bg-opacity-65 w-full bg-purple-600 dark:bg-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 dark:hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200'
              >
                {isAuthenticating ? (
                  "Please wait..."
                ) : (
                  <>{authMode === "login" ? "Sign In" : "Create Account"}</>
                )}
              </button>
            </form>
            <div className='mt-8'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-200 dark:border-gray-800' />
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400'>
                    Or continue with
                  </span>
                </div>
              </div>

              <div className='mt-6'>
                <button
                  disabled={isAuthenticating}
                  type='button'
                  className='w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200'
                >
                  <svg
                    stroke='currentColor'
                    fill='currentColor'
                    strokeWidth={0}
                    version='1.1'
                    x='0px'
                    y='0px'
                    viewBox='0 0 48 48'
                    enableBackground='new 0 0 48 48'
                    className='h-5 w-5'
                    height='1em'
                    width='1em'
                    xmlns='http:www.w3.org/2000/svg'
                  >
                    <path
                      fill='#FFC107'
                      d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                       c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                       c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                    />
                    <path
                      fill='#FF3D00'
                      d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                     	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                    />
                    <path
                      fill='#4CAF50'
                      d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
 	                    c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                    />
                    <path
                      fill='#1976D2'
                      d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
 	                    c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                    />
                  </svg>

                  <span>
                    Sign {authMode === "login" ? "in" : "up"} with Google
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
