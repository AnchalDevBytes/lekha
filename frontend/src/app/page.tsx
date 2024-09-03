import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 bg-white shadow-md rounded-lg p-10 flex flex-col justify-center items-center space-y-8">
        <div className="space-y-6 text-center">
          <div className="inline-block rounded-full bg-indigo-600 px-4 py-2 text-lg font-medium text-white">
            Welcome to Lekha
          </div>
          <h1 className="text-5xl max-w-4xl font-extrabold tracking-tighter text-gray-900 sm:text-7xl">
          Words are, of course, the most powerful drug used by mankind.
          </h1>
          <p className="max-w-[600px] mx-auto text-gray-600 md:text-lg">
            Let your words resonate with the world. Share your stories, thoughts, and ideas on a platform that values your voice.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center text-white">
              ✍️
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Effortless Writing</h3>
            <p className="text-gray-500">Concentrate on your content; we handle the technicalities.</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-lg text-gray-800">Enter into Lekha</div>
          <p className="text-indigo-600 animate-bounce">You need to <span className="text-green-600">signup/login</span> to engage with the community.</p>
        </div>
        <Link
          href="/publicRoutes/signup"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-indigo-600 px-8 text-lg font-medium text-white shadow-md hover:bg-indigo-700 transition-all duration-300"
          prefetch={false}
        >
          Signup / Signin
        </Link>
      </div>
    </div>
  );
}
