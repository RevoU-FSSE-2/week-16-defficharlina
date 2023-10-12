const { Router } = require("express");
const {
  getAllBook,
  createBook,
  editBook,
  deleteBook,
} = require("../controller/bookController");

const bookRouter = Router();

bookRouter.get("/", getAllBook);
bookRouter.post('/', createBook)
bookRouter.put('/:id',editBook)
bookRouter.delete('/:id',deleteBook)

module.exports = bookRouter;
