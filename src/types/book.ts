export interface BookType {
  title: string
  coverImage: string
  author: string
  publishDate: Date
  blurb: string
  originalContent: string
  translatedContent: Record<string, string>
}
