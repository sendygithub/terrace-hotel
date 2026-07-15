import SignUpForm from "./SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white w-96 mx-auto rounded-sm shadow p-8">
        <h1 className="text-4xl font-bold mb-1">Sign Up</h1>
        <p className="font-medium mb-5 text-gray-500">Create your account</p>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
