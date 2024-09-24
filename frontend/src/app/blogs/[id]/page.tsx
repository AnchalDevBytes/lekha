"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import axios, { AxiosResponse } from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Cookie from 'js-cookie'
import { toast } from "react-toastify";
import { BlogInterface, BlogResponseInterface } from "@/interfaces/BlogResponseData";
import ClockIcon from "@/components/icons/ClockIcon";
import ShareIcon from "@/components/icons/ShareIcon";

const ArticlePage = ()  => {
    const [blog, setBlog] = useState<BlogInterface>({
        author : {
            name : ""
        },
        authorId : "",
        id : "",
        content : "",
        title : "",
        publishedAt : ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {id} = useParams();

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(()=>{
        (async() => {
            try {
                setIsLoading(true)
                const { data } : AxiosResponse<BlogResponseInterface> = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers : {
                        Authorization : Cookie.get("accessToken")
                    }
                });
                setBlog(data.data);
                setIsLoading(false);
            } catch (error) {
                if(error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error("Unknow error while fetching Blog");
                }
                setIsLoading(false);
            }
        })()
    },[id]);

    const handleSharing = () => {
      navigator.clipboard.writeText(window.location.href)
      .then(() => toast.success('Link copied!'))
      .catch((error) => toast.error('Failed to copy link' || error.message));
    }
    
  return isLoading ? (
    <div className="h-screen w-screen flex items-center justify-center text-xl font-bold tracking-widest bg-teal-50">
        ...loading blog
    </div>
    ) : (
    <div className="container flex py-12 px-4 sm:px-6 lg:px-8 p-10">
      <div className="space-y-8 overflow-hidden ">
        <div className="text-center space-y-4">
          <h1 className="mx-auto text-3xl font-bold text-teal-700 mt-20 lg:mt-0 lg:w-[900px]">{blog?.title}</h1>
          <div className="flex items-center justify-center text-muted-foreground text-sm">
            <span>{new Date(blog?.publishedAt).toLocaleString('en-GB')}</span>
            <span className="mx-2">·</span>
            <span>{`${Math.ceil(blog?.content.length/100)} minutes`}</span>
          </div>
        </div>
        <article className="bg-card rounded-lg border shadow-lg p-6 lg:p-12">
          <div className="flex items-center justify-between mb-4 lg:mb-8">
            <div className="flex items-center text-muted-foreground text-sm">
              <Avatar className="w-8 h-8 mr-2">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-teal-700 text-white">{blog?.author?.name?.slice(0,1).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>By {blog?.author.name}</span>
            </div>
          </div>
          <div id="blogContent" className="border-t border-muted pt-4 lg:pt-8">
            <div className="w-full min-h-96 text-slate-600">
                {
                    blog?.content
                }
            </div>
            <div className="flex items-center justify-between my-6 lg:my-8">
              <div 
                className="flex items-center text-muted-foreground text-sm cursor-pointer hover:text-teal-600 transition-all duration-300"
                onClick={handleSharing}
              >
                <ShareIcon className="w-4 h-4 mr-2" />
                <span>Share this article</span>
              </div>
              <div className="flex items-center text-muted-foreground text-sm">
                <ClockIcon className="w-4 h-4 mr-2" />
                <span>{Math.ceil(blog?.content.length/100)} min read</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default ArticlePage;
