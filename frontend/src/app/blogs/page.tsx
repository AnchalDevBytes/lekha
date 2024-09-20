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
      console.log(Cookie.get("accessToken"));
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
    <div className='container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-h-screen overflow-hidden'>
      <div className='space-y-4'>
        <div className='w-full text-center'>
          <h1 className='text-3xl font-bold'>Existantial Insights</h1>
          <p className='text-muted-foreground max-w-2xl mx-auto mt-1'>
            Explore the latest trends, technologies, and best practices shaping
            the future of web development.
          </p>
        </div>
        {isLoading ? (
          <div className='w-full h-[60vh] flex items-center justify-center text-3xl font-bold tracking-widest animate-pulse'>
            ...loading
          </div>
        ) : (
          <div
            id='articleCardContainer'
            className='overflow-y-scroll h-[80vh] scrollbar-hide'
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