"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const isSignupView = searchParams.get("view") === "signup";
  const [authMode, setAuthMode] = useState<"login" | "signup">(
    isSignupView ? "signup" : "login"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  // SIGN-UP INTEGRATION
  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast(data.message);
    } else {
      toast(data.message || "Unable to create User");
    }
  };

  //SIGN-IN INTEGRATION
  const handlelogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (response?.error) {
      toast.error(response.error || "Invalid email or password");
    } else {
      toast.success("Login successful");
      router.push("/dashboard");
    }
  };

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
                  ? "Sign in to your  account"
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

            <form
              className='space-y-6'
              onSubmit={authMode === "signup" ? handleSignup : handlelogin}
            >
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
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-colors duration-200'
                  placeholder='Enter your email'
                />
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
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-colors duration-200'
                  placeholder='Enter your password'
                />
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
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-colors duration-200'
                    placeholder='Confirm your password'
                  />
                </div>
              )}

              {authMode === "login" && (
                <div className='flex items-center justify-between text-sm'>
                  <div className='flex items-center'>
                    <input
                      id='remember-me'
                      name='remember-me'
                      type='checkbox'
                      className='h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500'
                    />
                    <label
                      htmlFor='remember-me'
                      className='ml-2 text-gray-600 dark:text-gray-400'
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type='button'
                    className='text-purple-600 dark:text-purple-400 hover:text-purple-500'
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type='submit'
                className='w-full bg-purple-600 dark:bg-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 dark:hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200'
              >
                {authMode === "login" ? "Sign In" : "Create Account"}
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
                    xmlns='http://www.w3.org/2000/svg'
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

                  <span>Sign in with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className=' pb-4 flex justify-center'>
        <Link href='/' className='flex-shrink-0 flex items-center'>
          <Gift className='h-8 w-8 text-red-600' />
          <span className='ml-2 mt-1 text-2xl font-bold text-green-600'>
            GatherGift
          </span>
        </Link>
      </div> */}
    </div>
  );
}
