import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="font-medium font-cool">
      <Head>
        <title>Login | Siresta</title>
      </Head>
      <div className="shadow py-8 sticky top-0 bg-white">
        <div className="max-w-xl px-8 m-auto text-center font-semibold">
          Login to your account
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
          <button
            onClick={handleLogin}
            className="text-white w-full my-2 rounded-lg py-2.5 px-4 font-semibold border-none outline-none focus:border-none focus:outline-none active:border-none active:outline-none bg-gradient-to-r from-red-500 to-pink-600 focus:ring-red-500 focus:ring-2 ring-offset-2"
          >
            Login
          </button>
        </div>
        <p className="text-center text-xs font-semibold">
          Don't Have Account?{" "}
          <span className="text-red-500">
            <Link href="/signup">Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
