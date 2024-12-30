import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function ViewQuote() {
  // Using useParams to extract the quoteId from the URL params.
  const { quoteId } = useParams();
  // useState hook to store the quote details fetched from the backend.
  const [quote, setQuote] = useState(null);
  // API URL fetched from environment variables.
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Fetch the quote details
    axios
      .get(apiUrl + `/api/quotes/${quoteId}`)
      .then((response) => setQuote(response.data))
      .catch((error) => console.error("Error fetching quote:", error));
  }, [quoteId]);

  // Function to handle the user's decision (accept/deny) regarding the quote.
  const handleDecision = (decision) => {
    axios
      .post(apiUrl + `/api/quotes/${quoteId}/${decision}`)
      .then(() => {
        // Update the quote status in the state based on the decision made.
        setQuote((prevQuote) => ({
          ...prevQuote,
          status: decision,
        }));
        // Display a success or error toast depending on the decision.
        if (decision === "accepted") {
          toast.success("You have accepted the quote!");
        } else {
          toast.error("You have denied the quote.");
        }
      })
      .catch((error) => console.error("Error submitting decision:", error));
  };

  // Conditionally rendering the quote details if they have been fetched, otherwise showing a loading message.
  const quoteElem = quote ? (
    <div>
      <h3>Quote ID: {quote.quoteId}</h3>
      <p>Status: {quote.status}</p>
      <div style={{ textAlign: "right" }}>
        <button
          onClick={() => handleDecision("accepted")}
          className="btn btn-info"
          style={{ marginRight: "8px" }}
        >
          Accept
        </button>
        <button
          onClick={() => handleDecision("denied")}
          className="btn btn-secondary"
        >
          Deny
        </button>
      </div>
    </div>
  ) : (
    <p>Loading quote...</p>
  );

  return (
    <div className="view-quote">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">{quoteElem}</div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default ViewQuote;
