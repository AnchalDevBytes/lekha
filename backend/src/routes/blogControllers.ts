import { Context, Hono, Next } from 'hono'
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

blogRouter.use('/*', async (c: Context, next: Next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRETE);
    if(!user) {
      return c.json({
        status: 403,
        message: "You are not loggedIn"
      })
    }
    c.set("userId", String(user.id))
    await next();
  } catch (error) {
    if(error instanceof Error) {
      return c.json({
        status : 500,
        message : error.message
      })
    }else {
      return c.json({
          status : 500,
          message : "Unknow error while verifying jwt"
      })
    }
  }
})

blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get('userId');
  const body = await c.req.json();
  const { success, data } = createBlogInput.safeParse(body);
    if(!success) {
      return c.json({
        status: 411,
        message: "Inputs are not correct"
      })
    }

    const { title, content } = data;

    if(!title) {
      return c.json({
        status: 400,
        message: "Title is required"
      })
    }

    if(!content) {
      return c.json({
        status: 400,
        message: "Content is required"
      })
    }

  try {
    const blog = await prisma.blog.create({
      data: {
        title: title,
        content: content,
        authorId: Number(userId),
      }
    })

    if(!blog) {
      return c.json({
        status: 400,
        message: "Error while creating blog"
      })
    }

    return c.json({
      status: 200,
      message: "Blog created successfully",
      data: blog
    })
  } catch (error) {
    if(error instanceof Error) {
      return c.json({
        status : 500,
        message : error.message
      })
    }else {
      return c.json({
          status : 500,
          message : "Unknow error occured"
      })
    }
  }
});

blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get('userId');
  const body = await c.req.json();
  const { success, data } = updateBlogInput.safeParse(body);

    if(!success) {
      c.status(411);
      return c.json({
        message: "Inputs are not correct"
      })
    }
  const { id, title, content } = data;

  if(!id && !title && !content) {
    return c.json({
      status: 400,
      message: "Blog is, title and content is required"
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
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true
          }
        },
        authorId: true,
        published: true
      }
    })

    if(!blog) {
      return c.json({
        status: 500,
        message: "Error while updating blog"
      })
    }

    return c.json({
      status: 200,
      message: "Blog updated successfully!",
      data: blog
    })
  } catch (error) {
    if(error instanceof Error) {
      return c.json({
        status : 500,
        message : error.message
      })
    }else {
      return c.json({
          status : 500,
          message : "Unknow error occured"
      })
    }
  }
})

// TODO: add pagination
blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      content: true,
       author: {
        select: {
          name: true
        }
       },
      authorId: true,
      published: true,
      publishedAt: true
    },
    orderBy: {
      publishedAt : 'desc'
    }
  });

  if(!blogs) {
    return c.json({
      status: 500,
      message: "Error while fetching blogs"
    })
  }

  return c.json({
    status: 200,
    message: "Blog fetched successfully",
    data: blogs
  }) 
});

blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');
  if(!id) {
    return c.json({
      status: 400,
      message: "Blog id is required!"
    })
  }

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true
          }
        },
        authorId: true,
        published: true,
        publishedAt: true,
      }
    });

    if(!blog) {
      return c.json({
        status: 500,
        message: "Error while finding blog"
      })
    }

    return c.json({
      status: 200,
      message: "Found blog successfully!",
      data: blog
    })
  } catch (error) {
    if(error instanceof Error) {
      return c.json({
        status : 500,
        message : error.message
      })
    }else {
      return c.json({
          status : 500,
          message : "Unknow error occured"
      })
    }
  }
})

export default blogRouter;