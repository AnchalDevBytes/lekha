import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {

  const featureData = [
    { icon: "✍️", title: "Write", description: "Share your thoughts with the world" },
    { icon: "🌟", title: "Discover", description: "Explore diverse perspectives" },
    { icon: "🤝", title: "Connect", description: "Engage with like-minded individuals" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex flex-col">
      <div className="flex-grow flex flex-col justify-center items-center p-4 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-teal-200 opacity-50" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='4' height='4' fill='%23ffffff' /%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="z-10 text-center animate-fade-in-up">
          <h1 className="text-5xl sm:text-7xl font-bold text-teal-800 mb-6 text-center">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Lekha</span>
          </h1>
          <p className="text-lg sm:text-xl text-teal-600 mb-8 text-center max-w-2xl mx-auto">
            Dive into a sea of ideas. Write, read, and connect with passionate bloggers from around the world.
          </p>
          <Link href="/publicRoutes/signup" prefetch={false}>
            <Button
              size="lg"
              className="h-14 px-8 text-lg rounded-full bg-teal-700 hover:bg-teal-800 text-white shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Button>
          </Link>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featureData.map((feature, index) => (
            <Card key={index} className="bg-white bg-opacity-80 backdrop-blur-lg">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-teal-700 mb-2">{feature.title}</h3>
                <p className="text-teal-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
