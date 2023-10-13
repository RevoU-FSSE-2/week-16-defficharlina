const { ObjectId } = require("mongodb");

const getAllBook = async (req, res) => {
  try {
    const book = await req.db.collection('book').find().toArray()
    
    res.status(200).json({
      message: 'Book successfully retrieved',
      data: book
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createBook = async (req, res) => {
  const {name, author } = req.body
  
  console.log(name, author, `<=================== book ==================`);
  
  try {
    const newBook = await req.db.collection('book').insertOne({ name, author })
    
    res.status(200).json({
      message: 'Book successfully created',
      data: newBook
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

  const editBook = async (req, res) => {
  const {id} = req.params
  const { name, author } = req.body
  
  console.log(req.query, `<=================== query ==================`);
  
  try {
    const book = await req.db.collection('book').updateOne({ _id: new ObjectId(id) }, { $set: { name, author } })
    
    res.status(200).json({
      message: 'Book successfully edit',
      data: book
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

  const deleteBook = async (req, res) => {
  const {id} = req.params
  
  console.log(req.query, `<=================== query ==================`);
  
  try {
    const book = await req.db.collection('book').findOneAndDelete({ _id: new ObjectId(id) })
    
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