import "bootstrap/dist/css/bootstrap.min.css";
import Addbook from "./Components/Addbook";
import Books from "./Components/Books";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Details from "./Components/Details";
import Category from "./Components/Category";

function App() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = React.useState({
    bookName: "",
    author: "",
    quantity: "",
    comments: "",
  });

  const [category, setCategory] = React.useState({
    id: 1
  });

  const handleChange = (e) => {
    if (e.target.name === "category") {
      setCategory((prevInput) => ({
        ...prevInput,
        id: parseInt(e.target.value),
      }));
    } else {
      setBook((prevInput) => ({
        ...prevInput,
        [e.target.name]: e.target.value,
      }));
    }

  }

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingBook, setAddingBook] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = await axios.get(
          "http://localhost:1337/api/books/?populate=*"
        );
        setBooks(result.data.data);
        setLoading(false);
      }
      catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [addingBook]);

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/api/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    }
    catch (error) {
      setError(error);
    }
  }

  const addBook = async (e) => {
    e.preventDefault();
    const bookData = {
      data: {
        bookName: book.bookName,
        author: book.author,
        quantity: book.quantity,
        comments: book.comments,
        category: {
          id: category.id,
        }
      }
    }
    setAddingBook(true);
    try {
      await axios.post("http://localhost:1337/api/books",
        bookData
      );
      setBooks([...books, book]);
      setBook({
        bookName: "",
        author: "",
        quantity: "",
        comments: "",
      });
      setCategory({
        id: 1
      });
      setAddingBook(false);
    }
    catch (error) {
      setError(error);
    }
  }

  const lendBook = async (id) => {
    try {
      await axios.put(`http://localhost:1337/api/books/${id}`,{
        data: {
          quantity: books.find((book) => book.id === id).attributes.quantity - 1
      }
    }
    );
    setBooks(books.map((book) => book.id === id ? {...book, attributes: {...book.attributes, quantity: book.attributes.quantity - 1}} : book));
    }
    catch (error) {
      setError(error);
    }
  }

  const backBook = async (id) => {
    try {
      await axios.put(`http://localhost:1337/api/books/${id}`,{
        data: {
          quantity: books.find((book) => book.id === id).attributes.quantity + 1
      }
    }
    );
    setBooks(books.map((book) => book.id === id ? {...book, attributes: {...book.attributes, quantity: book.attributes.quantity + 1}} : book));
    }
    catch (error) {
      setError(error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="justify-content-center">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Books books={books} deleteBook={deleteBook} lendBook={lendBook} backBook={backBook} />} />
          {/*books={books} deleteBook={deleteBook} lendBook={lendBook} backBook={backBook} */}
          <Route path="/addbook" element={<Addbook book={book} category={category} handleChange={handleChange} addBook={addBook} />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/category/:id" element={<Category />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
