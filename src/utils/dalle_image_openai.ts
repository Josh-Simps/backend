import axios from 'axios'
import { config } from '../config/config'
import { BookModel } from '../models/book'

const getImage = async (prompt: string): Promise<string> => {
  const formattedPrompt = prompt
    .replace(/(?:\r\n|\r|\n)/g, ' ')
    .replace(/'/g, '')
    .replace(/"/g, '')
    .slice(0, 900)
    .trim()

  const data = {
    prompt: formattedPrompt,
    n: 1,
    size: '256x256',
    response_format: 'b64_json',
  }

  let response

  try {
    response = await axios.post('https://api.openai.com/v1/images/generations', data, {
      headers: {
        Authorization: `Bearer ${config.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    console.error('error happened')
  }

  const b64String = response.data.data[0].b64_json
  return b64String
}

const skipPageIndex = [6, 7]

const main = async () => {
  const currentDoc = await BookModel.findById('64cdd10923b0d36c39921d23').lean().exec()

  const englishContent = currentDoc.content['english']

  for (let i = 0; i < englishContent.length; i++) {
    const englishPage = englishContent[i]
    if (i <= 5) {
      continue
    }
    if (skipPageIndex.includes(i)) {
      continue
    }

    console.log('check', i)
    const b64String = await getImage(englishPage)

    await BookModel.findByIdAndUpdate('64cdd10923b0d36c39921d23', {
      $push: {
        'content.images': b64String,
      },
    }).exec()
  }
}

main()
