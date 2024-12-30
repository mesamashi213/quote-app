import React, { Component } from "react";

class Quotes extends Component {
  render() {
    const quotes = this.props.quotes.map((quote) => (
      <tr key={quote.id}>
        <td>{quote.quoteId}</td>
        <td>{quote.status}</td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Quotes</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Quote ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{quotes}</tbody>
        </table>
      </div>
    );
  }
}

export default Quotes;
