import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: String,
    isbn: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    publishedYear: Number
});

const BookModel = mongoose.model('Book', bookSchema);

export default BookModel;