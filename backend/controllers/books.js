const Book = require("../models/book");

module.exports.createBook = (req, res) => {
  const { title, author, genre, publishedYear, description } = req.body;

  if (!title || !author || !genre || !publishedYear || !description) {
    return res.status(400).send({ message: "Invalid Data" });
  }

  Book.create({ title, author, genre, publishedYear, description })
    .then((book) => res.send({ data: book }))
    .catch((err) =>
      res.status(500).send({ message: "It was not possible for create a book" + err })

    );
};

module.exports.getBooks = (req, res) => {
   Book.find({})
   .then((book) => res.send({ data: book }))
   .catch((err) =>
    res.status(500).send({ message: "Server Error" })
  );
}

module.exports.getBookByAuthor = (req, res) => {
  const { author } = req.body;
   Book.find({author: author})
   .then((book) => res.send({ data: book }))
   .catch((err) =>
    res.status(500).send({ message: "Server Error" })
  );
}

module.exports.getBookByTitle = (req, res) => {
  const { title } = req.body;
   Book.find({title: { $regex: title, $options: "i" }})
   .then((book) => res.send({ data: book }))
   .catch((err) =>
    res.status(500).send({ message: "Server Error" })
  );
}

module.exports.getBookByGenre = (req, res) => {
  const { genre } = req.body;
   Book.find({genre: genre})
   .then((book) => res.send({ data: book }))
   .catch((err) =>
    res.status(500).send({ message: "Server Error" })
  );
}

module.exports.deleteBook = (req, res) => {
  const { bookId } = req.params;

  Book.findByIdAndDelete(bookId)
    .then((deletedBook) => {
      if (!deletedBook) {
        return res.status(404).send({ message: "That book was not found to be deleted" });
      }
      res.send({ message: "Book deleted successfully", data: deletedBook });
    })
    .catch((err) => {
      res.status(500).send({ message: "Server error" });
    });
};

module.exports.updateBook = (req, res) => {
  const { title, author, genre, publishedYear, description, avaliableCopies } = req.body;

  const update = {
    title,
    author,
    genre,
    publishedYear,
    description,
  };

  if (avaliableCopies !== undefined) {
    update.avaliableCopies = avaliableCopies;
  }

  Book.findByIdAndUpdate(
    req.params.bookId,
    update,
    {
      new: true,
      runValidators: true,
    }
  )
  .then(book => {res.send({ data: book })})
  .catch(err => res.status(500).send('Server error'))
}
