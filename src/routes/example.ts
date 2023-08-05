import { Request, Response, Router } from 'express'
import { config } from '../config/config'
import { Status } from '../types/status'

const exampleRoute = Router()

exampleRoute.route('/example').get(async (req: Request, res: Response) => {
  try {
    return res.status(Status.Ok).json(config.SAMPLE_TEXT)
  } catch (err) {
    return res.status(Status.InternalServerError).json(err.message)
  }
})

export { exampleRoute }
