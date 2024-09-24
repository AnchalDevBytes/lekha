import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-teal-50 flex flex-col">
      <div className="flex-grow flex flex-col justify-center items-center p-4 sm:p-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-teal-800 mb-6 text-center">
          Welcome to Lekha
        </h1>
        <p className="text-lg sm:text-xl text-teal-600 mb-8 text-center max-w-2xl">
          Dive into a sea of ideas. Write, read, and connect with passionate bloggers from around the world.
        </p>
          <Link
            href="/publicRoutes/signup"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-teal-700 px-8 text-lg font-medium text-white shadow-md hover:bg-teal-800 transition-all duration-300"
            prefetch={false}
          >
            Signup / Signin
          </Link>
      </div>
    </div>
  );
}
