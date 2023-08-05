import express from 'express'
import { Request, Response } from 'express'
import cors from 'cors'
import { config } from './config/config'
import morgan from 'morgan'
import { exampleRoute } from './routes/index'

const app = express()

app.use(cors())
app.use(express.json())

if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// define a route handler for the default home page
app.get('/', async (req: Request, res: Response) => {
  return res.status(200).send('A cool API :)')
})

app.use(exampleRoute)

export { app }
