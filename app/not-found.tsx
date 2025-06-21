
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-9xl font-extrabold text-gray-300 select-none">404</h1>
      <p className="text-2xl sm:text-3xl font-semibold text-gray-700 mt-4">
        Oops! Page not found <span className="inline-block animate-pulse">😕</span>
      </p>
      <p className="mt-2 text-gray-500 max-w-md">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>

      <div className="mt-8 flex gap-4 justify-center">
        <Link
          href="/"
          className="px-6 py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          🏠 Go Home
        </Link>
        <Link
          href="/help"
          className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          ❓ Help
        </Link>
      </div>
    </div>
  );
}
