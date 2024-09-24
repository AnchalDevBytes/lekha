"use client";
import Article from "@/components/Article";
import { Blog, BlogsResponseData } from "@/interfaces/BlogsResponseData";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Cookie from 'js-cookie';

const BookmarksPage = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const { data }: AxiosResponse<BlogsResponseData> = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: Cookie.get('accessToken')
        }
      });

      if (data) {
        setAllBlogs(data.data);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error occurred fetching blogs");
    } finally {
      setIsLoading(false);
    }
  };

  const filterBookmarkedArticles = () => {
    const bookmarkIds = JSON.parse(localStorage.getItem("Bookmark") || "[]");

    const filteredArticles = allBlogs.filter(blog => bookmarkIds.includes(String(blog.id)));
    setBookmarkedArticles(filteredArticles);
  };
  

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (allBlogs.length > 0) {
      filterBookmarkedArticles();
    }
  }, [allBlogs]);

  if (isLoading) {
    return <p className="flex justify-center items-center text-teal-800 font-medium tracking-widest animate-pulse h-[80vh] text-2xl ">Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto py-28 px-4 sm:px-6 lg:px-8 max-h-screen overflow-hidden">
      <h1 className='text-4xl font-bold text-teal-700 md:tracking-wider'>Your Collection</h1>
        <div
            id='articleCardContainer'
            className='overflow-y-scroll h-[80vh] scrollbar-hide pb-16 mt-2 lg:mt-6'
        >
            {bookmarkedArticles.length > 0 ? (
                bookmarkedArticles.map(article => (
                <Article
                    key={article.id}
                    title={article.title}
                    content={article.content}
                    author={article.author.name}
                    publishedDate={article.publishedAt}
                    id={article.id.toString()}
                />
                ))
            ) : (
                <p className="text-teal-300">No bookmarks found.</p>
            )}
        </div>
    </div>
  );
};

export default BookmarksPage;
