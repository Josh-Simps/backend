import { Root } from './types/book_type'
import axios from 'axios'
import { BookModel } from '../models/book'
import moment from 'moment'

const imageUrlToBase64 = async (imageUrl: string): Promise<string> => {
  let image = await axios.get(imageUrl, { responseType: 'arraybuffer' })
  const rawBase64 = Buffer.from(image.data).toString('base64')
  return `data:image/jpeg;base64,${rawBase64}`
}

const main = async () => {
  const response = await axios.get<Root>('https://openlibrary.org/search.json', {
    params: {
      author: 'J. K. Rowling',
      limit: 10,
    },
  })

  const data = response.data

  for (const doc of data.docs) {
    console.log('title', doc.title)
    const imageUrlLink = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
    const imageBase64Value = await imageUrlToBase64(imageUrlLink)

    const newDoc = new BookModel({
      title: doc.title,
      coverImage: imageBase64Value,
      author: doc.author_name[0] ?? 'Placeholder Author',
      publishDate: moment(doc.first_publish_year).toDate(),
      blurb: '',
      content: {},
    })
    await newDoc.save()
  }

  process.exit()
}
main()
