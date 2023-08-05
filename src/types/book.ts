export interface BookType {
  title: string
  coverImage: string
  author: string
  publishDate: Date
  blurb: string
  content: Record<string, string[]> & {
    images: string[]
  }
}
