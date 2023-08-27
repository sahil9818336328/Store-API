require('dotenv').config()

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const router = require('./routes/products')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Strore Api</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', router)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
