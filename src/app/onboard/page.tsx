import { Suspense } from "react";
import { LoaderScreen } from "@/components/LoaderScreen";
import { Onboard } from "./onboard";

export default function AuthPage() {
  return (
    <Suspense fallback={<LoaderScreen />}>
      <Onboard />
    </Suspense>
  );
}
