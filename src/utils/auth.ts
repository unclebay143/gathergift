import { signIn, signOut } from "next-auth/react";

export const handleAuthentication = async ({
  nextUrl,
  provider,
  data,
}: {
  nextUrl?: string;
  provider: "credentials" | "google";
  data?: { email: string; password: string };
}) => {
  try {
    const csrfResponse = await fetch('/api/auth/csrf');
    const { csrfToken } = await csrfResponse.json();

    const response = await signIn(provider, {
      callbackUrl: nextUrl || `${window.location.origin}/dashboard`,
      csrfToken, 
      ...data,
      redirect: false,
    });

    console.log("SignIn Response:", response);
    return response;
  } catch (err) {
    console.error("Error during authentication:", err);
  }
};


export const handleLogout = () => {
  signOut({
    callbackUrl: `${window.location.origin}`,
  });
};
