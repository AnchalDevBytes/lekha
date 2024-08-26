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
    const { success } = signupInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        message: "Inputs are not correct"
      })
    }
    try {
      const user = await prisma.user.create({
        data: {
          userName: body.userName,
          password: body.password,
          name: body.name
        }
      })
  
      const jwt = await sign({id: user.id}, c.env.JWT_SECRETE);
      return c.json({jwt})
    } catch (error) {
      c.status(403);
      return c.text("Error while signing up...");
    }
  })
  
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        message: "Inputs are not correct"
      })
    }
    try {
      const user = await prisma.user.findUnique({
        where: {
          userName: body.userName
        }
      })
      if(!user) {
        c.status(403);
        return c.json({error: "User not found"});
      }
      const jwt = await sign({id: user.id}, c.env.JWT_SECRETE);
      return c.json({jwt});
    } catch (error) {
      return c.json({error: error})
    }
  })
  
  export default userRouter;