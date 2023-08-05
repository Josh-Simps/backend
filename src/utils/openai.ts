import { Configuration, OpenAIApi } from 'openai'
import { config } from '../config/config'
import fs from 'fs'
import path from 'path'

/*
Instructions to use this script:
1. Create the book.txt file which contains the content of a book
2. Run this script with the OPENAI_API_KEY in the .env file
3. The script will create a new file called book_english.txt with your chosen style of olden day English
*/

const content = fs.readFileSync(path.resolve(__dirname, 'book.txt')).toString()

const configuration = new Configuration({
  organization: 'org-y3oXjTDIJvPhNcoEua5IjUcs',
  apiKey: config.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const main = async () => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-16k',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant that is able to transalte modern English text into olden day English.',
      },
      {
        role: 'user',
        content: `Convert Convert the following book content into 15th century English:
"
${content}
"
      `,
      },
    ],
  })
  console.log(completion.data.choices[0].message)
  const responseContent = completion.data.choices[0].message.content
  fs.writeFileSync(path.resolve(__dirname, 'book_english.txt'), responseContent, { encoding: 'utf-8' })
}
main()
