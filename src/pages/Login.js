import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/booklist");
    } catch (err) {
      setError("Failed to log in. Check your credentials.");
    } finally {
      setLoading(false); // Set loading to false after the process
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading && <p className="text-blue-500 text-center">Logging in...</p>} {/* Loading indicator */}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>Login</button>
        <p>
          Don’t have an account?{" "}
          <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;