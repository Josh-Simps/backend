import fs from 'fs'
import path from 'path'
import { BookModel } from '../models/book'

const content = fs.readFileSync(path.resolve(__dirname, 'book.txt')).toString()

const paginateContent = async (content: string, charactersPerPage: number): Promise<string[]> => {
  const contentPages: string[] = []
  const contentByWords = content.split(' ')

  let currentWords = 0
  let currentPageContent: string[] = []

  for (let word of contentByWords) {
    if (currentWords >= charactersPerPage) {
      // Go into the next page
      contentPages.push(currentPageContent.join(' '))
      currentWords = word.length
      currentPageContent = []
    } else {
      currentPageContent.push(word)
      currentWords += word.length
    }
  }

  const currentDoc = await BookModel.findById('64cdd10923b0d36c39921d23').lean().exec()

  console.log('currentDoc.content', currentDoc.content)

  await BookModel.findByIdAndUpdate('64cdd10923b0d36c39921d23', {
    content: {
      ...currentDoc.content,
      english: contentPages,
    },
  })

  console.log(contentPages.length)

  process.exit()

  return contentPages
}

paginateContent(content, 900)

export { paginateContent }
