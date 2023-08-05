import { BookType } from 'book'
import { Schema } from 'mongoose'

export const bookSchema = new Schema<BookType>({
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
