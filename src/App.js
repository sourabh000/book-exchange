import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBook from "./pages/AddBook";
import EditBook from './pages/EditBook';
import BookList from "./pages/BookList";
import Request from "./pages/Request"; 

function App() {
  return (
    <Router>
          <Navbar/> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/editbook/:id" element={<EditBook />} />
        <Route path="/request" element={<Request />} /> {/* Add Requests route */}
        <Route path="/booklist" element={<BookList />} />
      </Routes>
    </Router>
  );
}

export default App;
