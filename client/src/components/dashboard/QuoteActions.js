import React from "react";
import { Link } from "react-router-dom";

// Functional component QuoteActions
const QuoteActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/send-quote" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1"></i> Send New Quote
      </Link>
    </div>
  );
};

export default QuoteActions;
