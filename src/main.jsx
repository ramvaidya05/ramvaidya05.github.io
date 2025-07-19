import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for React 18+
import App from './App.jsx'; // Import your App component
import './index.css'; // Assuming you'll have a global CSS file for Tailwind directives

// Get the root element from index.html
const rootElement = document.getElementById('root');

// Create a root and render your App component
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
