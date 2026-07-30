import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import todoRouter from './routes/todo.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/user', userRouter) 
app.use('/api/v1/todo', todoRouter) 

export default app