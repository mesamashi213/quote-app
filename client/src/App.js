import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing components for different routes
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import NotFound from "./components/not-found/NotFound";
import Dashboard from "./components/dashboard/Dashboard";
import ViewQuote from "./components/quote/ViewQuote";
import SendQuote from "./components/quote/SendQuote";
import "./App.css"; // Importing the CSS file for the app's styles

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar /> {/* The Navbar component is rendered on every page */}
          {/* Setting up the Routes for different paths */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/quote/:quoteId" element={<ViewQuote />} />
            <Route path="/send-quote" element={<SendQuote />} />
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
          <Footer />{" "}
          {/* Footer component is rendered at the bottom of the page */}
        </div>
      </Router>
    );
  }
}

export default App;
