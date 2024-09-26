import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {

  const featureData = [
    { icon: "✍️", title: "Write", description: "Share your thoughts with the world" },
    { icon: "🌟", title: "Express", description: "Explore diverse perspectives" },
    { icon: "🤝", title: "Connect", description: "Engage with like-minded individuals" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-green-200 flex flex-col">
      <div className="flex-grow flex flex-col justify-center items-center p-4 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-teal-200 opacity-50" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='4' height='4' fill='%23ffffff' /%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="absolute top-32 rotate-45 left-96 w-52 h-80 bg-sky-500/50 rounded-full blur-2xl"></div>
        <div className="absolute bottom-24 rotate-45 right-80 w-52 h-80 bg-sky-500/50 rounded-full blur-2xl"></div>

        <div className="z-10 text-center animate-fade-in-up">
          <h1 className="text-5xl sm:text-7xl font-bold text-teal-800 mb-6 text-center font-mono border-b-4 px-20 pb-3 border-cyan-600 rounded-b-3xl">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Lekha</span>
          </h1>
          <p className="text-lg sm:text-xl text-teal-600 mb-8 text-center max-w-2xl mx-auto">
            Dive into a sea of ideas. Write, read, and connect with passionate bloggers from around the world.
          </p>
          <Link href="/publicRoutes/signup" prefetch={false}>
            <Button
              size="lg"
              title="Click to get started"
              className="h-14 px-8 text-lg rounded-full bg-teal-700/70 backdrop-filter hover:backdrop-blur-sm hover:bg-gradient-to-br hover:from-teal-300/40  hover:to-teal-800/50 text-white shadow-lg transition-all duration-300 transform hover:scale-105 hover:underline"
            >
              Get Started
            </Button>
          </Link>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featureData.map((feature, index) => (
            <Card key={index} className="bg-gradient-to-br to-green-700/70 from-green-900/40 bg-opacity-80 rounded-3xl border-2 border-teal-700 backdrop-filter backdrop-blur-sm transition-all duration-300 shadow-lg shadow-teal-800 hover:rotate-3">
              <CardContent className="p-6">
                <div className="text-4xl animate-bounce mb-4">{feature.icon}</div>
                <h3 className="text-3xl tracking-widest font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-teal-700 to-cyan-500">{feature.title}</h3>
                <p className="text-teal-200 font-bold text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
