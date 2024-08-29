"use client";
import { useState } from "react";

const AllBlogs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
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
              article here
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;