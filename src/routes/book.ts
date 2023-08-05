import { Request, Response, Router } from 'express'
import { BookModel } from '../models/book'

export const bookRoute = Router()

bookRoute.route('/').get(async (req: Request, res: Response) => {
  try {
    const bookMetadata = await BookModel.find().select(['title', 'coverImage', 'author', 'publishDate'])

    return res.status(200).json(bookMetadata)
  } catch (err) {
    return res.status(500).json(err.message)
  }
})

bookRoute.route('/:bookId').get(async (req: Request<{ bookId: string }>, res: Response) => {
  try {
    const book = await BookModel.findById(req.params.bookId)

    if (!book) {
      return res.status(404).json(`There is no book with the id ${req.params.bookId}`)
    }

    // TODO: Only return first few pages

    return res.status(200).json(book)
  } catch (err) {
    return res.status(500).json(err.message)
  }
})
