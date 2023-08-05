import { Request, Response, Router } from 'express'
import { config } from '../config/config'

const exampleRoute = Router()

exampleRoute.route('/example').get(async (req: Request, res: Response) => {
  try {
    return res.status(200).json(config.SAMPLE_TEXT)
  } catch (err) {
    return res.status(500).json(err.message)
  }
})

export { exampleRoute }
