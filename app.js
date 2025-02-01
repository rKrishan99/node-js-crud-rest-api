const express = require('express');
const app = express();

app.use(express.json()); //express.json() is middleware that parses incoming JSON requests.

let books = [
    {
        id: 1,
        title: "Book 1"
    },
    {
        id: 2,
        title: "Book 2"
    },
    {
        id: 3,
        title: "Book 3"
    }
];

//intro routes
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to our bookstore api",
    });
});

//get all books
app.get("/get", (req, res) => {
    res.json(books);
});

//get a single book
app.get("/get/:id", (req, res) => {
    const book = books.find(item => item.id === parseInt(req.params.id));
    if(book){
        res.status(200).json(book);
    }else{
        res.status(404).json({
            message: 'Book is not found!'
        });
    }
});

//Add a book
app.post("/add", (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: `Book ${books.length + 1}`
    }

    books.push(newBook);
    res.status(200).json({
        data: newBook,
        message: 'New book is added successfully'
    })

});

//update a book
app.put("/update/:id", (req, res) => {
    const findCurrentBook = books.find(bookItem => bookItem.id === parseInt(req.params.id)); // ✅ Fixed

    if (findCurrentBook) {
        findCurrentBook.title = req.body.title || findCurrentBook.title;

        res.status(200).json({
            message: "Book is updated!",
            data: findCurrentBook
        });
    } else {
        res.status(404).json({
            message: "Book is not found!"
        });
    }
});


//delete a book
app.delete("/delete/:id", (req, res) => {
    const findIndexOfCurrentBook = books.findIndex(bookItem => bookItem.id === parseInt(req.params.id)); // ✅ Fixed

    if (findIndexOfCurrentBook !== -1) {
        const deleteBook = books.splice(findIndexOfCurrentBook, 1); // Remove the book from the array

        res.status(200).json({
            message: "Book is deleted!",
            data: deleteBook[0]
        });
    } else {
        res.status(404).json({
            message: "Book is not found!"
        });
    }
});

app.listen(3000, () => {
    console.log("Server is running!")
})
