const Book = require("../models/Book");

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().lean();
        res.json(books.map((book) => ({ ...book, _id: book._id.toString() })));
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).lean();
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json({ ...book, _id: book._id.toString() });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.addBook = async (req, res) => {
    try {
        const { title, author, isbn, available } = req.body;
        if (!title || !author || !isbn) {
            return res.status(400).json({ message: "Title, author, and ISBN are required" });
        }
        const book = new Book({ title, author, isbn, available: available !== false });
        await book.save();
        const plainBook = book.toObject();
        plainBook._id = book._id.toString();
        res.status(201).json(plainBook);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const updates = req.body;
        const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true }).lean();
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json({ ...book, _id: book._id.toString() });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id).lean();
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json({ message: "Book deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
