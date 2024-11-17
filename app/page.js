"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const onSignUpClick = () => {
    router.push("/signup");
  };
  const onLoginClick = () => {
    router.push("/login");
  };

  return (
    <main>
      <div className="flex flex-col items-center gap-3">
        <h3>Welcome</h3>
        <div className="flex flex-row items-center">
          <button
            onClick={onSignUpClick}
            className="px-4 py-2 bg-blue-800 rounded-md"
          >
            <p className="text-center text-white">Sign Up</p>
          </button>
          <button
            onClick={onLoginClick}
            className="px-4 py-2 bg-blue-600 rounded-md"
          >
            <p className="text-center text-white">Login</p>
          </button>
        </div>
      </div>
    </main>
  );
}
