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
import axios from "axios";

const Navbar = () => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/api/v1/user/logout`, {
        headers : {
          Authorization : Cookie.get('accessToken')
        }
      });
      Cookie.remove('accessToken');
      Cookie.remove('refreshToken');
      toast.success("Logged out Successfully!");
      router.replace("/publicRoutes/signin");
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message)
       } else {
          toast.error("Unknow error while Logout..");
       }
    }
  }

  const handleBookmark = () => {
    router.push("/blogs/saved-blogs");
  }

  return (
    <div className='absolute top-2 right-3 w-96 rounded-md px-5 h-16 flex items-center justify-around shadow'>
      <Link
        href='/blogs/create-blog'
        className='cursor-pointer hover:shadow duration-300 transition-all py-2 px-5 bg-black hover:bg-slate-950/90 text-white rounded-full active:text-sky-400 active:shadow-lg'
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
            <AvatarFallback>AW</AvatarFallback>
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