"use client"
import Link from "next/link";
import Cookie from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
      Cookie.remove('accessToken');
      Cookie.remove('refreshToken');
      toast.success("Logged out Successfully!");
      router.replace("/publicRoutes/signin");
  }

  const handleBookmark = () => {
    router.push("/blogs/saved-blogs");
  }

  return (
    <div className='absolute top-2 md:right-3 w-full md:w-96 rounded-md px-5 h-16 flex items-center justify-around shadow'>
      <Link
        href='/blogs/create-blog'
        className='cursor-pointer hover:shadow duration-300 transition-all py-2 px-5 bg-teal-800 hover:bg-teal-950/90 text-white rounded-full active:text-sky-400 active:shadow-lg'
      >
        Create
      </Link>
      <Link
        href='/blogs'
        className='cursor-pointer hover:shadow duration-300 transition-all py-2 px-5 bg-slate-100 text-black rounded-full active:text-sky-400 active:shadow-lg'
      >
        All Blogs
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className='hover:shadow transition-all duration-300 active:text-sky-400 active:shadow-lg'>
            <AvatarImage src='https://github.com/withastro/astro/blob/main/assets/astro.png?raw=true' />
            <AvatarFallback>Me</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='absolute -right-4 top-4'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleBookmark}>Saved Blogs</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;