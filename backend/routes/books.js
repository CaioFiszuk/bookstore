const router = require('express').Router();
const { createBook, getBooks, getBookByAuthor, getBookByGenre, getBookByTitle, deleteBook, updateBook } = require('../controllers/books');

router.post('/', createBook);
router.get('/', getBooks);
router.get('/author', getBookByAuthor);
router.get('/genre', getBookByGenre);
router.get('/title', getBookByTitle);
router.delete('/:bookId', deleteBook);
router.patch('/:bookId', updateBook);

module.exports = router;