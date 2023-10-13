const { Router } = require("express");
const {
  getAllBook,
  createBook,
  editBook,
  deleteBook,
} = require("../controller/bookController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");

const bookRouter = Router();

bookRouter.get("/", authenticationMiddleware, getAllBook);
bookRouter.post('/', authenticationMiddleware, createBook)
bookRouter.put('/:id', authenticationMiddleware, editBook)
bookRouter.delete('/:id', authenticationMiddleware, deleteBook)

module.exports = bookRouter;
