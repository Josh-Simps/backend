import { BookModel } from '../models/book'
import { transalte } from './openai'

const translateEnglish = async (): Promise<any> => {
  const currentDoc = await BookModel.findById('64cdd10923b0d36c39921d23').lean().exec()

  const englishContent = currentDoc.content['english']

  console.log('currentDoc.content', englishContent.length)

  const translatedContents: any[] = []

  for (const englishPage of englishContent) {
    console.log('check')
    const translatedContent = await transalte(englishPage)
    translatedContents.push(translatedContent)
  }
  console.log(translatedContents)

  await BookModel.findByIdAndUpdate('64cdd10923b0d36c39921d23', {
    content: {
      ...currentDoc.content,
      '15': translatedContents,
    },
  }).exec()
}

translateEnglish()
