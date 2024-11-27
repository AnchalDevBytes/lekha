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

interface Meta {
    currentPage : number,
    pageSize : number,
    totalPage : number,
    totalCount : number
}

export interface BlogsResponseData {
    status: number,
    message: string,
    meta: Meta
    data: Blog[]
}
