import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import './BookList.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollection = await getDocs(collection(db, "books"));
        setBooks(booksCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books: ", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDeleteBook = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteDoc(doc(db, "books", id));
        setBooks(books.filter(book => book.id !== id));
        alert("Book deleted successfully!");
      } catch (error) {
        console.error("Error deleting book: ", error);
      }
    }
  };

  const handleRequestExchange = async (book) => {
    if (!user) {
      alert("You need to be logged in to request an exchange.");
      return;
    }

    const requestData = {
      bookId: book.id,
      fromUserId: user.uid,
      toUserId: book.owner,
      status: "pending"
    };

    try {
      await addDoc(collection(db, "requests"), requestData);
      alert("Exchange request sent successfully!");
    } catch (error) {
      console.error("Error sending exchange request: ", error);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-message">
        <p>Loading books...</p>
      </div>
    );
  }

  return (
    <div className="book-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title, author, or genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      {filteredBooks.length === 0 ? (
        <p className="no-books">No books available. Add some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">Author: {book.author}</p>
              <p className="book-genre">Genre: {book.genre}</p>
              {user && user.uid !== book.owner && ( // Only show the request button if the user is not the owner
                <button
                  onClick={() => handleRequestExchange(book)}
                  className="request-button"
                >
                  Request Exchange
                </button>
              )}
                  {user && user.uid === book.owner && (
                
                <button
                className="edit-button"
                onClick={() => navigate(`/editbook/${book.id}`)}
                >
                  Edit Book
                </button>
              )}
              {user && user.uid === book.owner && (
                
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="delete-button"
                >
                  Delete Book
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;


// {
//   "bookId": "book_id_here",
//   "fromUser Id": "requesting_user_id",
//   "toUser Id": "book_owner_id",
//   "status": "pending" // or "accepted", "rejected"
// }