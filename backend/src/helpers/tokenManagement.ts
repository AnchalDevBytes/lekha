// import { jwt } from "hono/jwt";

// interface User {
//     id : number;
//     name? : string | null;
//     userName : string;
//     refreshToken? : string | null;
//     createdAt : Date | null;
//     updatedAt: Date | null;
// }

// const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "accessTokenSecret";
// const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ?? "refreshTokenSecret";

// export const generateAccessToken = (user : User) => {
//     return jwt.sign({
//         userId : user.id,
//         userName: user.userName,
//         name: user.name
//     }, accessTokenSecret, {expiresIn : '2d'});
// }

// export const generateRefreshToken = (user: User) => {
//     return jwt.sign({
//         userId: user.id,
//         userName: user.userName,
//         name: user.name
//     }, refreshTokenSecret, {expiresIn : '7d'})
// }

// export const verifyAccessToke = (token : string) => {
//     try {
//         return jwt.verify(token, accessTokenSecret);
//     } catch (error) {
//         throw new Error("Invalid or expired access token...");
//     }
// }

// export const verifyRefreshToken = (token : string) => {
//     try {
//         return jwt.verify(token, refreshTokenSecret);
//     } catch (error) {
//         throw new Error("Invalid or expired refresh token...");
//     }
// }
