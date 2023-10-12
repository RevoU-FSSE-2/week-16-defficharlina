require('dotenv').config()

const express = require('express')
const router = require('./routes');
const useMiddleware = require('./middleware')

const app = express()

useMiddleware(app)
app.use(express.json())
app.use(router)


app.use((err, req, res, next) => {
  console.log(err, `<=================== error ==================`);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors
  })
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
