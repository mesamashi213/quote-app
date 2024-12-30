import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import QuoteActions from "./QuoteActions";
import Quotes from "./Quotes";

const apiUrl = process.env.REACT_APP_API_URL;
const socket = io(apiUrl);

function Dashboard() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    // Listen for real-time updates
    socket.on("quote-status-updated", (data) => {
      setQuotes((prevQuotes) =>
        prevQuotes.map((quote) =>
          quote.quoteId === data.quoteId
            ? { ...quote, status: data.status }
            : quote
        )
      );
    });

    // Fetch initial quotes
    axios
      .get(apiUrl + "/api/quotes")
      .then((response) => {
        setQuotes(response.data);
      })
      .catch((error) => console.error("Error fetching quotes:", error));

    return () => {
      socket.off("quote-status-updated");
    };
  }, []);

  const dashboardContent = (
    <div>
      <QuoteActions />
      <Quotes quotes={quotes} />
      <div style={{ marginBottom: "60px" }} />
    </div>
  );

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
