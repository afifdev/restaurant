import Link from "next/link";
export default function Footer() {
  return (
    <div className="fixed w-screen bottom-0 left-0 bg-black text-white">
      <div className="max-w-7x m-auto px-8 py-1 text-center">
        Haven't Login Yet?{" "}
        <Link href="/login">
          <a className="font-bold text-red-600">Login</a>
        </Link>
      </div>
    </div>
  );
}
