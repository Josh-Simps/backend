import { Request, Response, Router } from 'express'
import { BookModel } from '../models/book'
import { Status } from '../types/status'
import { ErrorService } from '../services/errorService'
import { isValidObjectId } from 'mongoose'

export const bookRoute = Router()

const BookId1984 = '64cdd10923b0d36c39921d23'

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
    if (!isValidObjectId(req.params.bookId)) {
      return res.status(Status.BadRequest).json(`The id '${req.params.bookId}' is not a valid id`)
    }

    const book = await BookModel.findById(req.params.bookId)

    if (!book) {
      return res.status(Status.NotFound).json(`There is no book with the id '${req.params.bookId}'`)
    }

    // TODO: Remove we don't have content for the other books yet
    const book1984 = await BookModel.findById(BookId1984)
    const mockedBook = { ...book, content: book1984.content }

    // TODO: Only return first few pages

    return res.status(Status.Ok).json(mockedBook)
  } catch (err) {
    return ErrorService.handleError(res, err)
  }
})
