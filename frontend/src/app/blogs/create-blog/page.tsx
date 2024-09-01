"use client"
import axios, { AxiosResponse } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { createBlogResponseData } from "@/interfaces/CreateBlogResponseData";
import { CreateBlogInput } from "@anchalrajdevsys/lekha-common";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [blogInput, setBlogInput] = useState<CreateBlogInput>({
      title: "",
      content: ""
    });

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const router = useRouter();

    const blogInputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setBlogInput({
        ...blogInput,
        [e.target.name] : e.target.value
      })
    }

    const createBlog = async (e: FormEvent) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        const { data } : AxiosResponse<createBlogResponseData> = await axios.post(`${BACKEND_URL}/api/v1/blog`, blogInput, {
          headers: {
            Authorization: Cookie.get('token')
          }
        })
        if(data.status === 200) {
          toast.success("Blog created Successfully!");
          setIsLoading(false);
          router.push('/blogs')
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        if(error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error("Unknown error occured fetching blogs...")
        }
        setIsLoading(false);
      }
    }

    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Publish your thought</h1>
          </div>
          <article className="bg-card rounded-lg shadow-lg min-h-[70vh] p-6 lg:p-12">
            <form className="space-y-6" onSubmit={createBlog}>
              <div>
                <label htmlFor="title" className="block text-lg font-bold text-muted-foreground">
                  Title of the blog
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="block w-full rounded-md border-muted bg-background p-2 text-sm text-foreground focus:border-primary focus:ring-primary"
                  placeholder="Enter a title for your blog post"
                  onChange={blogInputChangeHandler}
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-lg font-bold text-muted-foreground">
                  Content of the blog
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={20}
                  className="block w-full rounded-md border-muted bg-background p-2 text-sm text-foreground focus:border-primary focus:ring-primary"
                  placeholder="Write the content of your blog post"
                  onChange={blogInputChangeHandler}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1"
                >
                  {isLoading ? "Loading..." : "Publish"}
                </button>
              </div>
            </form>
          </article>
        </div>
      </div>
    )
  }
