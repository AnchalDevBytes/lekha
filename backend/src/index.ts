import { Hono } from 'hono'
import userRouter from "../src/routes/userControllers"
import blogRouter from "../src/routes/blogControllers"

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRETE: string;
  }
}>()

app.route('/api/v1/user', userRouter)
app.route('api/v1/blog', blogRouter)


export default app
