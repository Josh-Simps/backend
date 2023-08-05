import http from 'http'
import { config } from './config/config'
import { app } from './app'

const port = config.PORT

process.on('uncaughtException', (err) => {
  console.error('error happened', err)
})

process.on('unhandledRejection', (err) => {
  console.error('error happened', err)
})

const httpServer = new http.Server(app)

const server = httpServer.listen(port, function () {
  console.log(`Listening on *:${port}`)
})
