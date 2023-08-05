import { config } from './config/config'
import { app } from './app'

const port = config.PORT

process.on('uncaughtException', (err) => {
  console.error('error happened', err)
})

process.on('unhandledRejection', (err) => {
  console.error('error happened', err)
})

const server = app.listen(port, function () {
  console.log(`Listening on *:${port}`)
})
