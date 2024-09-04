import { Hono } from 'hono'
import userRouter from "../src/routes/userControllers"
import blogRouter from "../src/routes/blogControllers"
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRETE: string;
  }
}>()

app.use('*', cors({
  origin: ['http://localhost:3000', 'https://lekha.vercel.app/'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
  credentials: true
}))

app.route('/api/v1/user', userRouter)
app.route('api/v1/blog', blogRouter)


export default app
