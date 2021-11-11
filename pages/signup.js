import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isMatch, setIsMatch] = useState(1);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value === repassword) {
      setIsMatch(1);
    } else {
      setIsMatch(0);
    }
  };

  const handleRepassword = (e) => {
    setRepassword(e.target.value);
    if (e.target.value === password) {
      setIsMatch(1);
    } else {
      setIsMatch(0);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="font-medium font-cool">
      <Head>
        <title>Sign Up | Siresta</title>
      </Head>
      <div className="shadow py-8 sticky top-0 bg-white">
        <div className="max-w-xl px-8 m-auto text-center font-semibold">
          Create your account
        </div>
      </div>
      <div className="px-8 py-8 max-w-md m-auto">
        <p className="text-2xl sm:text-3xl font-bold text-center">
          Welcome to Siresta
        </p>
        <div className="my-8">
          <input
            value={username}
            onChange={handleUsername}
            type="text"
            className="w-full my-2 rounded-lg py-2.5 px-4 font-semibold border-2 border-gray-300 outline-none focus:outline-none active:outline-none focus:border-gray-500"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={handlePassword}
            type="password"
            className="w-full my-2 rounded-lg py-2.5 px-4 font-semibold border-2 border-gray-300 outline-none focus:outline-none active:outline-none focus:border-gray-500"
            placeholder="Password"
          />
          <input
            value={repassword}
            onChange={handleRepassword}
            type="password"
            className="w-full my-2 rounded-lg py-2.5 px-4 font-semibold border-2 border-gray-300 outline-none focus:outline-none active:outline-none focus:border-gray-500"
            placeholder="Re-Type Password"
          />
          <div
            className={`${
              isMatch ? "hidden" : "flex"
            } items-center text-red-500`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="ml-2 text-xs mt-0.5">Password not match</p>
          </div>
          <button
            onClick={handleRegister}
            className="text-white w-full my-2 rounded-lg py-2.5 px-4 font-semibold border-none outline-none focus:border-none focus:outline-none active:border-none active:outline-none bg-gradient-to-r from-red-500 to-pink-600 focus:ring-red-500 focus:ring-2 ring-offset-2"
          >
            Create my account!
          </button>
        </div>
        <p className="text-center text-xs font-semibold">
          Already Had An Account?{" "}
          <span className="text-red-500">
            <Link href="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
