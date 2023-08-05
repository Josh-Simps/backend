import dotenv from 'dotenv'

dotenv.config()

const config = {
  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI,
  NODE_ENV: process.env.NODE_ENV || 'development',
  SAMPLE_TEXT: process.env.SAMPLE_TEXT,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
}

export { config }
