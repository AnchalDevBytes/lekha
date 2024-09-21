import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context, Hono } from 'hono';
import { signinInput, signupInput } from '@anchalrajdevsys/lekha-common';
import { sign } from 'hono/jwt'
import { setCookie } from 'hono/cookie'

  const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
    }
  }>();

  const generateAccessToken = async (
    user: { id: number; userName: string; name?: string | null }, 
    secret: string
  ) => {
    const payload ={
        userId: user.id,
        userName: user.userName,
        name: user.name,
      };
      return await sign(payload, secret, 'HS256');
  };

  const generateRefreshToken = async (
    user: { id: number; userName: string; name?: string | null }, 
    secret: string
  ) => {
    const payload ={
      userId: user.id,
      userName: user.userName,
      name: user.name,
    };
    return await sign(payload, secret, 'HS256')
  };

  userRouter.post('/signup', async (c : Context) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const { success, data } = signupInput.safeParse(body);

    if(!success) {
      return c.json({
        status: 411,
        message: "Inputs are not correct"
      })
    }
    const { name, userName, password } = data;

    if(!name) {
      return c.json({
        status: 400,
        message: "Name is required"
      });
    }
    
    if(!userName) {
      return c.json({
        status: 400,
        message: "Username is required"
      });
    }

    if(!password) {
      return c.json({
        status: 400,
        message: "Password is required"
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        userName,
      },
    });

    if(existingUser) {
      c.json({
        status: 400,
        message: "User with the given username already exists!"
      })
    }

    try {
      const user = await prisma.user.create({
        data: {
          name,
          userName,
          password,
        },
        select: {
          id: true,
          name: true,
          userName: true,
          createdAt: true,
          updatedAt: true
        },
      });

      if(!user) {
        return c.json({
          status: 500,
          message: "Error creating new user!"
        });
      }

      const accessToken = await generateAccessToken(user, c.env.ACCESS_TOKEN_SECRET);
      const refreshToken = await generateRefreshToken(user, c.env.REFRESH_TOKEN_SECRET);
  
      await prisma.user.update({
        where : {
          id: user.id,
        },
        data: {
          refreshToken
        }
      })

      // setCookie(c, "accessToken", accessToken, {
      //   httpOnly : true,
      //   secure: true,
      //   sameSite: 'none',
      //   maxAge: 60 * 60 * 24 * 1
      // });
      // setCookie(c, "refreshToken", refreshToken, {
      //   httpOnly : true,
      //   secure: true,
      //   sameSite: 'none',
      //   maxAge: 60 * 60 * 24 * 7
      // });

      return c.json({
        status: 200,
        message: "User created Successfully !!",
        user: user,
        accessToken,
        refreshToken
      })
    } catch (error) {
      if(error instanceof Error) { 
        return c.json({
          status: 500,
          message: "Unknown error while signing up"
        });
      } else {
        c.json({
          status: 500,
          message: "Unknown error while signup in ....."
        })
      }
    }
  });
  
  userRouter.post('/signin', async (c : Context) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const { success, data } = signinInput.safeParse(body);
    
    if(!success) {
      return c.json({
        status: 411,
        message: "Inputs are not correct"
      })
    }

    const { userName, password } = data;

    try {
      const user = await prisma.user.findUnique({
        where: { userName }
      })
      if(!user) {
        return c.json({
          status: 403,
          message: "User not found"
        });
      }

      if(user?.password !== password) {
        return c.json({
          status: 403,
          message: "Invalid password"
        })
      }

      const accessToken = await generateAccessToken(user, c.env.ACCESS_TOKEN_SECRET);
      const refreshToken = await generateRefreshToken(user, c.env.REFRESH_TOKEN_SECRET);

      await prisma.user.update({
        where : {
          id: user.id
        },
        data: {
          refreshToken
        }
      })

      // setCookie(c, "accessToken", accessToken, {
      //   httpOnly : true,
      //   secure: true,
      //   sameSite: 'none',
      //   maxAge: 60 * 60 * 24 * 1
      // });
      // setCookie(c, "refreshToken", refreshToken, {
      //   httpOnly : true,
      //   secure: true,
      //   sameSite: 'none',
      //   maxAge: 60 * 60 * 24 * 7
      // });

      return c.json({
        status: 200,
        message: "User login successfully",
        refreshToken,
        accessToken
      });
    } catch (error) {
      if (error instanceof Error) {
        return c.json({
          status: 500,
          message: error.message
        })
      } else {
        c.json({
          status: 500,
          message: "Unknown error while signed in ....."
        })
      }
    }
  })

  // userRouter.get('/logout', async (c) => {
  //   try {
  //     const response = c.json({
  //       status: 200,  
  //       success: true,
  //       message: "Logout successfully"
  //     })
  
  //     response.headers.append(
  //       'Set-Cookie', 
  //       `accessToken=; HttpOnly; Secure; Path=/; Expires=${new Date(0).toUTCString()}`
  //     );
  //     response.headers.append(
  //       'Set-Cookie',
  //       `refreshToken=; HttpOnly; Secure; Path=/; Expires=${new Date(0).toUTCString()}`
  //     );
  
  //     response.headers.set('Location', '/login');
  
  //     return response;
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       return c.json({
  //         success: false,
  //         status: 500,
  //         message: error.message
  //       })
  //     } else {
  //       c.json({
  //         status: 500,
  //         message: "Unknown error while logout..."
  //       })
  //     }
  //   }

  // });
  
  export default userRouter;
