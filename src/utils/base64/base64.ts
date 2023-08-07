import fs from 'fs'
import path from 'path'

const main = () => {
  const files = fs.readdirSync(path.resolve(__dirname, 'images'))

  let base64Img = []
  for (const fileName of files) {
    const img = fs.readFileSync(path.resolve(__dirname, 'images', fileName))
    base64Img.push(Buffer.from(img).toString('base64'))
  }

  const content = {
    images: base64Img,
  }
  fs.writeFileSync(path.resolve(__dirname, 'base.json'), JSON.stringify(content, null, 2), { encoding: 'utf-8' })
}
main()
