const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
const { Book } = db.models;

const app = express();
const PORT = 4000;
//MiddleWare
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

function asyncHandler(cb) {
	return async (req, res, next) => {
		try {
			await cb(req, res, next);
		} catch (error) {
			res.status(500).send(error);
		}
	};
}

app.use(express.static("public"));

// GET REQUESTS

app.get(
	"/",
	asyncHandler(async (req, res) => {
		res.redirect("/books");
	})
);

app.get(
	"/books",
	asyncHandler(async (req, res) => {
		const books = await Book.findAll();
		res.render("index", { books: books });
	})
);

app.get("/books/new", (req, res) => {
	res.render("new-book");
});

app.get(
	"/books/:id",
	asyncHandler(async (req, res) => {
		const book = await Book.findByPk(req.params.id);
		res.render("update-book", { book: book });
	})
);

// POST REQUESTS

app.post(
	"/books/new",
	asyncHandler(async (req, res) => {
		const newBook = await Book.create(req.body);
		console.log(newBook.toJSON(), "::Created");
		res.redirect("/books");
	})
);

app.post(
	"/books/:id",
	asyncHandler(async (req, res) => {
		const book = await Book.findByPk(req.params.id);
		await book.update(req.body);
		res.redirect("/books");
	})
);

app.post(
	"/books/:id/delete",
	asyncHandler(async (req, res) => {
		const book = await Book.findByPk(req.params.id);
		await book.destroy();
		console.log(book.toJSON(), ":: Deleted");
		res.redirect("/books");
	})
);

app.listen(PORT, () => console.log(`Server Open, Listening on Port: ${PORT}`));
