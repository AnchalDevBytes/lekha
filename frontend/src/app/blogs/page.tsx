"use client";
import { Blog, BlogsResponseData } from "@/interfaces/BlogsResponseData";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Cookie from 'js-cookie'
import { toast } from "react-toastify";
import Article from "@/components/Article";

const AllBlogs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const { data } : AxiosResponse<BlogsResponseData> = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: Cookie.get('accessToken')
        }
      });
      
      if(data) {
        setBlogs(data.data);
      }
      setIsLoading(false);
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Unknown error occured fetching blogs...")
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);
  
  return (
    <div className='container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-h-screen overflow-hidden bg-teal-50'>
      <div className='flex-grow p-4 sm:p-8'>
        {isLoading ? (
          <div className='w-full h-screen flex items-center justify-center text-3xl font-bold tracking-widest animate-pulse'>
            <span className="mb-80 text-teal-800">
              ...loading
            </span>
          </div>
        ) : (
          <div
            id='articleCardContainer'
            className='overflow-y-scroll h-[80vh] scrollbar-hide mt-10 lg:mt-6'
          >
            {
              blogs?.map((blog) => (
                <Article
                    key={blog.id}
                    id={String(blog.id)}
                    title={blog.title}
                    content={blog.content}
                    author={blog.author.name}
                    publishedDate={blog.publishedAt}
                />
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
