export interface Author {
    name: string
}

export interface Blog {
    id: number,
    title: string,
    content: string,
    author: Author,
    authorId: string,
    publishedAt: string
}

export interface BlogsResponseData {
    status: number,
    message: string,
    data: Blog[]
}
