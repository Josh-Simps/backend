export interface BookType {
  title: string
  coverImage: string
  author: string
  publishDate: Date
  blurb: string
  content: {
    images: string[]
    [key: string]: string[]
  }
}
