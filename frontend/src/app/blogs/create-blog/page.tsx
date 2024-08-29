"use client"
import { useState } from "react";

export default function CreateBlog() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Publish your thought</h1>
          </div>
          <article className="bg-card rounded-lg shadow-lg min-h-[70vh] p-6 lg:p-12">
            <form className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-lg font-bold text-muted-foreground">
                  Title of the blog
                </label>
                <input
                  type="text"
                  id="title"
                  className="block w-full rounded-md border-muted bg-background p-2 text-sm text-foreground focus:border-primary focus:ring-primary"
                  placeholder="Enter a title for your blog post"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-lg font-bold text-muted-foreground">
                  Content of the blog
                </label>
                <textarea
                  id="content"
                  rows={20}
                  className="block w-full rounded-md border-muted bg-background p-2 text-sm text-foreground focus:border-primary focus:ring-primary"
                  placeholder="Write the content of your blog post"
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
