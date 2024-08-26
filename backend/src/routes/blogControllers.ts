import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '@anchalrajdevsys/lekha-common';

const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRETE: string;
    },
    Variables: {
      userId: string;
    }
}>()

blogRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRETE);
    if(user) {
      c.set("userId", String(user.id))
      await next();
    }else {
      c.status(403)
      return c.json({
        message: "You are not loggedIn"
      })
    }
  } catch (error) {
    c.status(403)
    return c.json({
      message: "You are not loggedIn"
    })
  }
})

blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get('userId');
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        message: "Inputs are not correct"
      })
    }
  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(userId),
      }
    })
    return c.json({
      id: blog.id
    })
  } catch (error) {
    return c.json({error: error})
  }
});

blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get('userId');
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        message: "Inputs are not correct"
      })
    }
  try {
  const blog = await prisma.blog.update({
      where: {
        id: body.id,
        authorId: Number(userId)
      },
      data: {
        title: body.title,
        content: body.content,  
      }
    })
    return c.json({
      id: blog.id
    })
  } catch (error) {
    return c.json({error: error})
  }
})

// TODO: add pagination
blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({});
  return c.json({blogs}) 
});

blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');
  const blog = await prisma.blog.findFirst({
    where: {
      id: Number(id)
    }
  });
  return c.json({blog})
})


export default blogRouter;