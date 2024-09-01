export interface User {
    id: number,
    userName: string,
    password: string,
    blogs: any[]
}

export interface SigninResponseData {
    status: number,
    message: string,
    user: User,
    token: string
}