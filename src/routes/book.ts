import { Request, Response, Router } from 'express'
import { BookModel } from '../models/book'

export const bookRoute = Router()

bookRoute.route('/api/books').get(async (req: Request, res: Response) => {
  try {
    const bookMetadata = await BookModel.find().select(['title', 'coverImage', 'author', 'publishDate'])

    return res.status(200).json(bookMetadata)
  } catch (err) {
    return res.status(500).json(err.message)
  }
})
