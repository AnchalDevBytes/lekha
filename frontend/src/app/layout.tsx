import type { Metadata } from "next";
import { Inter as FontSans  } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Lekha",
  description: "A Fullstack Blog Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <main className="min-h-screen">
            {children}
          </main>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </body>
    </html>
  );
}
