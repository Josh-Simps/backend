import { BookType } from '../types/book'
import { Schema } from 'mongoose'
import { mongooseDb } from '../utils/mongoose'

const bookSchema = new Schema<BookType>({
  title: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  author: {
    type: String,
  },
  publishDate: {
    type: Date,
  },
  blurb: {
    type: String,
  },
  originalContent: {
    type: String,
  },
  translatedContent: {
    type: Map,
    of: String,
  },
})

export const BookModel = mongooseDb.model<BookType>('books', bookSchema)
