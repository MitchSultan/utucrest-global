import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-warm-ivory px-5 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-lg md:p-10">
        <Link href="/" className="font-display text-lg font-bold text-deep-teal">
          UtuCrest Global
        </Link>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
