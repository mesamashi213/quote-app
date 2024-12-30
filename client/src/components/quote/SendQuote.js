import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextFieldGroup from "../common/TextFieldGroup";
import toast, { Toaster } from "react-hot-toast";

// Reading the API URL from environment variables.
const apiUrl = process.env.REACT_APP_API_URL;

class SendQuote extends Component {
  constructor() {
    super();
    // Initializing the state with default values.
    this.state = {
      recipientEmail: "",
      errors: {},
      loading: false,
    };

    // Binding methods to `this`
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Lifecycle method that gets called when props or state changes. It updates errors state if new errors are passed
  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.errors && nextProps.errors !== nextState.errors) {
      return { errors: nextProps.errors || {} };
    }
    return null;
  }

  // Method to handle input field changes.
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    if (this.state.errors[e.target.name]) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          [e.target.name]: undefined,
        },
      }));
    }
  }

  // Method to handle form submission.
  onSubmit(e) {
    e.preventDefault();

    // Set the loading state to true while the request is being processed.
    this.setState({ loading: true });

    // Prepare the data to be sent with the request.
    const newQuote = {
      recipientEmail: this.state.recipientEmail,
    };

    // Make a POST request to the backend API to send the quote.
    axios
      .post(apiUrl + "/api/quotes/send", newQuote)
      .then(() => {
        // Show success toast notification.
        toast.success("Quote successfully sent!");
        setTimeout(() => {
          this.props.navigate("/");
        }, 1000);
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        // Handle errors and set the error state
        if (error.response && error.response.data) {
          // If the server responds with error data, set it in the state
          this.setState({
            errors: error.response.data,
          });
        } else {
          console.error("Error submitting quote:", error);
        }
      });
  }

  render() {
    const { errors, loading } = this.state;

    return (
      <div className="send-quote">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Send New Quote</h1>
              <p className="lead text-center"></p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Recipient Email Address"
                  name="recipientEmail"
                  type="email"
                  value={this.state.recipientEmail}
                  onChange={this.onChange}
                  error={errors.recipientEmail || ""}
                />
                <button
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <div>
                      <i className="fas fa-spinner fa-spin"></i>
                      &nbsp;Sending...
                    </div>
                  ) : (
                    "Send"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    );
  }
}

// Wrapper component to add the navigate prop to the SendQuote component.
const SendQuoteWithNavigate = (props) => {
  const navigate = useNavigate();
  return <SendQuote {...props} navigate={navigate} />;
};

export default SendQuoteWithNavigate;
