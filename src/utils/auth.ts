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
    return signIn(provider, {
      callbackUrl: nextUrl || `${window.location.origin}/dashboard`,
      ...data,
      redirect: false,
    });
  } catch (err) {
    return console.log(err);
  }
};

export const handleLogout = () => {
  signOut({
    callbackUrl: `${window.location.origin}`,
  });
};
