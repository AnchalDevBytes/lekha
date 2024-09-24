import Navbar from "@/components/Navbar";

export default function BlogLayout({ children } : { children : React.ReactNode }) {
    return (
        <div>
            <Navbar/>
            <div className="bg-teal-50 min-h-screen">
            {children}
            </div>
        </div>
    )
}
