const { ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken')
const { JWT_SIGN } = require('../config/jwt.js')


const getAllBook = async (req, res) => {
  const token = req.cookies.access_token;
  const decodedToken = jwt.verify(token, JWT_SIGN)

  let query = { author: decodedToken.username }

  if (decodedToken.role === "admin" || decodedToken.role === "superadmin") {
    query = {}
  }

  try {
    const book = await req.db.collection('book').find(query).toArray();
    res.status(200).json({
      message: 'Book successfully retrieved',
      data: book
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createBook = async (req, res) => {
  const token = req.cookies.access_token
  const { name } = req.body
  const decodedToken = jwt.verify(token, JWT_SIGN)

  try {
    const newBook = await req.db.collection('book').insertOne({ name, author: decodedToken.username })
    
    res.status(200).json({
      message: 'Book successfully created',
      data: newBook
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const editBook = async (req, res) => {
  const token = req.cookies.access_token
  const { id } = req.params
  const { name } = req.body
  const decodedToken = jwt.verify(token, JWT_SIGN)
  
  console.log(req.query, `<=================== query ==================`);
  
  try {
    const book = await req.db.collection('book').findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { name } })
    
    if (decodedToken.username !== book.author) {
      return res.status(403).json({
        message: 'you are not allowed to update',
        success : 'false'
      })
    }
    res.status(200).json({
      message: 'Book successfully edit',
      data: book
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

  const deleteBook = async (req, res) => {
  const token = req.cookies.access_token
  const {id} = req.params
  const decodedToken = jwt.verify(token, JWT_SIGN)
  
  console.log(req.query, `<=================== query ==================`);
  
  try {
    const book = await req.db.collection('book').findOneAndDelete({ _id: new ObjectId(id) })

    if (decodedToken.username !== book.author) {
      return res.status(403).json({
        message: 'you are not allowed to delete',
        success : 'false'
      })
    }
    
    if (!book) {
      // Data tidak ditemukan, kirim respon khusus
      res.status(404).json({
        message: 'Book not found',
        data: null
      });
    } else {
      res.status(200).json({
        message: 'Book successfully deleted',
        data: book
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllBook,
  createBook,
  editBook,
  deleteBook
}