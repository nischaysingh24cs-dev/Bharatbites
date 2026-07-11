import type { Metadata } from "next";
import { SignInClient } from "@/components/sign-in-client";
export const metadata: Metadata = { title: "Sign in" };
export default function SignInPage() {
  return <SignInClient />;
}
