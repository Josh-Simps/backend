import axios from 'axios'

const main = async () => {
  const response = await axios.get("https://openlibrary.org/search.json?q=a&limit=10")
  
}
main()
