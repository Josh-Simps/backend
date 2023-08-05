import fs from 'fs'
import path from 'path'

const content = fs.readFileSync(path.resolve(__dirname, 'book.txt')).toString()

const paginateContent = (content: string, charactersPerPage: number): string[] => {
  const contentPages = []
  const contentByWords = content.split(" ")
  
  let currentWords = 0
  let currentPageContent: string[] = []

  for (let word of contentByWords) {
    if (currentWords >= charactersPerPage) {
      // Go into the next page
      contentPages.push(currentPageContent.join(" "))
      currentWords = word.length
      currentPageContent = []
    } else {
      currentPageContent.push(word)
      currentWords += word.length
    }
  }

  console.log(contentPages.length)
  return contentPages
}

paginateContent(content, 900)

export { paginateContent }
