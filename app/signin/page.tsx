import SignInForm from "./SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignIn = () => {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md -mt-24 bg-white rounded-xl shadow-xl border border-gray-100 p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue to your account
          </p>
        </div>

        <SignInForm />
      </div>
    </section>
  );
};

export default SignIn;
