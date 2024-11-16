import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase";
import './AddBook.css'; // Import the same CSS file

function EditBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Get the book ID from the URL
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchBook = async () => {
      const bookDoc = doc(db, "books", id);
      const bookData = await getDoc(bookDoc);
      if (bookData.exists()) {
        const book = bookData.data();
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
      } else {
        setError("Book not found.");
      }
    };

    fetchBook();
  }, [id]);

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You need to be logged in to edit a book.");
      return;
    }
    try {
      const bookRef = doc(db, "books", id);
      await updateDoc(bookRef, {
        title,
        author,
        genre,
      });
      alert("Book updated successfully!");
      navigate("/booklist"); // Redirect to the book list after updating
    } catch (err) {
      setError("Failed to update the book. Please try again.");
    }
  };

  return (
    <div className="add-book-container"> {/* Use the same container class */}
      <div className="add-book-form"> {/* Use the same form class */}
        <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleUpdateBook}>
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
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBook;