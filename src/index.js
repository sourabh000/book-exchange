import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import './index.css'; // Your global CSS
import App from './App';

// Find the root element in your HTML
const rootElement = document.getElementById('root');

// Create a root using createRoot
const root = ReactDOM.createRoot(rootElement);

// Render your App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
