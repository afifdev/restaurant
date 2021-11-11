export default function Navbar() {
  return (
    <div className="flex justify-between items-center py-3 bg-white sticky top-0 z-50">
      <p className="font-bold text-2xl">siresta</p>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="absolute right-1.5 top-1 w-3 h-3 rounded-full bg-red-500"></div>
      </div>
    </div>
  );
}
