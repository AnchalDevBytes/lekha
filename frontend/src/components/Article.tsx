import { BookmarkIcon } from "@/components/icons/BookmarkIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface articlePropType {
  title: string;
  content: string;
  author: string;
  id : string,
  publishedDate : string
}

const Article = ({ title, content, author, publishedDate, id }: articlePropType) => {
  return (
    <Link href={`/blogs/${id}`} className='bg-card rounded-lg shadow-lg p-6 mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-2 border-black hover:shadow-xl duration-300 cursor-pointer hover:bg-slate-50 active:shadow-none'>
      <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground mb-4 max-w-lg">
              {content.slice(0, 100)}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-accent-foreground text-sm">
                <span>{publishedDate}</span>
                <span className="mx-4 text-lg">|</span>
                <span>{`${Math.ceil(content.length/100)} minutes`}</span>
                <span className="mx-4 text-lg">|</span>
                <span>By {author}</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-1">
                <BookmarkIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
    </Link>
  );
};

export default Article;