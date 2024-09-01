export interface createBlogResponseData {
    status: number,
    message: string,
    data: {
        id: string;
        title: string;
        content: string;
        published: boolean;
        authorId: string;
        publishedAt: string;
    };
}
