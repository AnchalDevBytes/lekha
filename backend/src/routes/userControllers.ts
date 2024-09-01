import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from '@anchalrajdevsys/lekha-common'

  const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRETE: string;
    }
  }>()

  userRouter.post('/signup', async (c) => {
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
        },
      });

      if(!user) {
        return c.json({
          status: 500,
          message: "Error creating new user!"
        });
      }
  
      const jwt = await sign({id: user.id}, c.env.JWT_SECRETE);

      return c.json({
        status: 200,
        message: "User created Successfully !!",
        user: user,
        token: jwt
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
  })
  
  userRouter.post('/signin', async (c) => {
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

      const jwt = await sign({id: user.id}, c.env.JWT_SECRETE);

      return c.json({
        status: 200,
        message: "User login successfully",
        token: jwt
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
  
  export default userRouter;
