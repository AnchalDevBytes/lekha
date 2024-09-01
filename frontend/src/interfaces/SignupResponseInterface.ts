export interface User {
    id : number,
    name : string,
    userName : string,
    password : string,
    blogs : any[]
}

export interface SignupResponseData {
    status: number,
    message: string,
    user: User,
    token: string
}