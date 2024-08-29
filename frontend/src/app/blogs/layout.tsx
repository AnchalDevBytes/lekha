import Navbar from "@/components/Navbar";

export default function BlogLayout({ children } : { children : React.ReactNode }) {
    return (
        <div>
            <Navbar/>
            {children}
        </div>
    )
}
