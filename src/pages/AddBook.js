import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase";
import './AddBook.css'; // Import the CSS file

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, loading, authError] = useAuthState(auth);

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You need to be logged in to add a book.");
      return;
    }
    try {
      await addDoc(collection(db, "books"), {
        title,
        author,
        genre,
        owner: user.uid,
        createdAt: new Date(),
      });
      setTitle("");
      setAuthor("");
      setGenre("");
      alert("Book added successfully!");
      navigate("/booklist"); // Redirect to book list after adding
    } catch (err) {
      setError("Failed to add the book. Please try again.");
    }
  };

  return (
    <div className="add-book-container">
      <div className="add-book-form">
        <h2 className="text-2xl font-bold mb-4">Add Book</h2>
        {error && <p className="text-red-500">{error}</p>}
        {!user ? (
          <p>
            Please <Link to="/login" className="text-blue-600 hover:underline">login</Link> to add a book.
          </p>
        ) : (
          <form onSubmit={handleAddBook}>
            <label>Book Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-4"
              required
            />
            <label>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-4"
              required
            />
            <label>Genre</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
            >
              Add Book
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddBook;