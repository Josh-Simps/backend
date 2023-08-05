import { Request, Response, Router } from 'express'
import { BookModel } from '../models/book'
import { Status } from '../types/status'
import { ErrorService } from '../services/errorService'

export const bookRoute = Router()

bookRoute.route('/').get(async (req: Request, res: Response) => {
  try {
    const bookMetadata = await BookModel.find().select(['title', 'coverImage', 'author', 'publishDate'])

    return res.status(Status.Ok).json(bookMetadata)
  } catch (err) {
    return ErrorService.handleError(res, err)
  }
})

bookRoute.route('/:bookId').get(async (req: Request<{ bookId: string }>, res: Response) => {
  try {
    const book = await BookModel.findById(req.params.bookId)

    if (!book) {
      return res.status(Status.NotFound).json(`There is no book with the id ${req.params.bookId}`)
    }

    // TODO: Only return first few pages

    return res.status(Status.Ok).json(book)
  } catch (err) {
    return ErrorService.handleError(res, err)
  }
})
