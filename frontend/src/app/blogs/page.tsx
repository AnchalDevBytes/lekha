"use client";
import { Blog, BlogsResponseData } from "@/interfaces/BlogsResponseData";
import axios, { AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import Cookie from 'js-cookie'
import { toast } from "react-toastify";
import Article from "@/components/Article";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const AllBlogs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 10;
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [catchedBlog, setCatchedBlog] = useState<{ [key: number] : Blog[] }>({});

  const blogs = useMemo(() => catchedBlog[currentPage] || [], [catchedBlog, currentPage]);

  const fetchBlogs = async (page : number) => {
    if(catchedBlog[page]) {
      return;
    }
    try {
      setIsLoading(true);
      const { data } : AxiosResponse<BlogsResponseData> = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        params : {
          page,
          pageSize
        },
        headers: {
          Authorization: Cookie.get('accessToken')
        }
      });
      
      if(data) {
        setCatchedBlog((prev) => ({ ...prev, [page] : data.data }));
        setTotalPages(data.meta.totalPage)
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

  const handlePageChange = (newPage : number) => {
    if(newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);
  
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-h-screen overflow-hidden bg-teal-50">
      <div className="flex-grow p-4 sm:p-8">
        {isLoading ? (
          <div className="w-full h-screen flex items-center justify-center text-3xl font-bold tracking-widest animate-pulse">
            <span className="mb-80 text-teal-800">...loading</span>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center pb-2 mt-10 lg:mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg text-white ${
                  currentPage === 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700"
                }`}
              >
                <MdArrowBackIosNew />
              </button>
              <span className="text-teal-800">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg text-white ${
                  currentPage === totalPages
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700"
                }`}
              >
                <MdArrowForwardIos />
              </button>
            </div>
            <div
              id="articleCardContainer"
              className="overflow-y-scroll h-[80vh] scrollbar-hide"
            >
              {blogs?.map((blog) => (
                <Article
                  key={blog.id}
                  id={String(blog.id)}
                  title={blog.title}
                  content={blog.content}
                  author={blog.author.name}
                  publishedDate={blog.publishedAt}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
