import { BookmarkIcon } from "@/components/icons/BookmarkIcon";
import { Button } from "@/components/ui/button";
import { renderToHTML } from "next/dist/server/render";
import Link from "next/link";
import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";

interface articlePropType {
  title: string;
  content: string;
  author: string;
  id : string,
  publishedDate : string
}

const Article = ({ title, content, author, publishedDate, id }: articlePropType) => {

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("Bookmark") || "[]");
    setIsBookmarked(storedBookmarks.includes(id));
  }, [id]);

  const toggleBookmark = () => {
    const storedBookmarks = JSON.parse(localStorage.getItem("Bookmark") || "[]");
    if(isBookmarked) {
      const updatedBookmark = storedBookmarks.filter((bookmarkId: string) => bookmarkId !== id);
      localStorage.setItem("Bookmark", JSON.stringify(updatedBookmark));
      setIsBookmarked(false);
    } else {
      localStorage.setItem("Bookmark", JSON.stringify([...storedBookmarks, id]));
      setIsBookmarked(true);
    }
  }

  return (
    <div className='bg-card rounded-lg shadow-sm p-6 mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:shadow-xl duration-300 hover:bg-slate-50 active:shadow-none'>
      <div className="flex-1">
        <Link href={`/blogs/${id}`} className="text-xl font-bold mb-2 text-teal-700 cursor-pointer hover:text-teal-800 underline underline-offset-4">{title}</Link>
          <div className="text-muted-foreground text-sm md:text-base mb-4 max-w-lg">
            <div dangerouslySetInnerHTML={{__html : `${content.slice(0, 100)} ...`}}/>
          </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-accent-foreground text-sm">
            <span>{new Date(publishedDate).toLocaleDateString()}</span>
            <span className="mx-4 text-lg">|</span>
            <span>{`${Math.ceil(content?.length/100)} minutes`}</span>
            <span className="mx-4 text-lg">|</span>
            <span>By {author}</span>
          </div>
          <Button 
            variant="ghost" size="sm" 
            className="gap-1" 
            onClick={toggleBookmark}
          >
            <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? "fill-teal-600 text-teal-600" : "text-teal-600"}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Article;
