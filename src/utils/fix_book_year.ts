import { Root } from './types/book_type'
import axios from 'axios'
import { BookModel } from '../models/book'
import moment from 'moment'

const main = async () => {
  const response = await axios.get<Root>('https://openlibrary.org/search.json', {
    params: {
      author: 'J. K. Rowling',
      limit: 10,
    },
  })

  const data = response.data

  for (const doc of data.docs) {
    const bookTitle = doc.title
    console.log('title: ', bookTitle)
    console.log('year:', doc.first_publish_year)

    const newDate = moment(doc.first_publish_year, 'YYYY').toDate()
    console.log('new date', newDate)
    await BookModel.findOneAndUpdate(
      {
        title: bookTitle,
      },
      {
        publishDate: newDate,
      },
    ).exec()
  }

  process.exit()
}
main()
