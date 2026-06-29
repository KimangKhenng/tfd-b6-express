import asyncHandler from "express-async-handler"
import BookModel from "../models/bookModel.js"

export const createBook = asyncHandler(async (req, res) => {
    const { title, isbn, author, publishedYear } = req.body
    const book = new BookModel({ title, isbn, author, publishedYear })
    await book.save()
    res.status(201).json({
        success: true,
        data: book,
        message: 'Book created successfully'
    });
})

export const getAllBooks = asyncHandler(async (req, res) => {
    const books = await BookModel.find({}).populate({
        path: 'author',
        select: 'name email age',
        options: { sort: { name: 1 } }
    })
    res.status(200).json({
        success: true,
        data: books
    })
})

export const getBookById = asyncHandler(async (req, res) => {
    const bookId = req.params.bookId
    const book = await BookModel.findById(bookId).populate('author', 'name email age')
    if (!book) {
        return res.status(404).json({
            success: false,
            error: 'Book not found'
        });
    }
    res.status(200).json({
        success: true,
        data: book
    })
})

export const updateBookById = asyncHandler(async (req, res) => {
    const book = await BookModel.findByIdAndUpdate(
        req.params.bookId,
        req.body,
        {
            new: true,           // Return updated document
            runValidators: true  // Run schema validators
        }
    );

    if (!book) {
        return res.status(404).json({
            success: false,
            error: 'Book not found'
        });
    }

    res.status(200).json({
        success: true,
        data: book,
        message: 'Book updated successfully'
    });
})

export const deleteBookById = asyncHandler(async (req, res) => {
    const book = await BookModel.findByIdAndDelete(req.params.bookId);
    if (!book) {
        return res.status(404).json({
            success: false,
            error: 'Book not found'
        });
    }
    res.status(200).json({
        success: true,
        data: {},
        message: 'Book deleted successfully'
    });
})