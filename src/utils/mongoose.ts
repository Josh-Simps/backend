import mongoose from 'mongoose'
import { config } from '../config/config'

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const mongooseDb = mongoose.createConnection(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongooseDb.once('open', function () {
  console.log('MongoDB database connection established successfully')
})

export { mongooseDb }
