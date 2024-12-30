// Import the Express module and create an Express app instance
var express = require("express");
// Load environment variables from a .env file into process.env
require("dotenv").config();
// http: built-in Node.js module to create HTTP servers
const http = require("http");
// socket.io: allows real-time, bidirectional communication between the client and server
const socketIo = require("socket.io");
// cors: a middleware to enable Cross-Origin Resource Sharing, allowing the backend to accept requests from other domains
const cors = require("cors");
// Initialize the Express application
const app = express();
// This server will handle HTTP requests and will be used to integrate with Socket.io
const server = http.createServer(app);
// Retrieve the frontend URL from the environment variables
const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

// Enable CORS for Express routes (API)
app.use(
  cors({
    origin: frontendUrl, // Allow requests from your React frontend (replace with your frontend URL)
    methods: ["GET", "POST"],
    credentials: true, // Allow cookies and credentials (optional)
  })
);

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: frontendUrl, // Allow Socket.IO connections from your React frontend
    methods: ["GET", "POST"],
    credentials: true, // Optional, to allow cookies
  },
});

// Attach the io instance to the Express app
app.set("io", io);

// Import the body-parser module to parse incoming request bodies
const bodyParser = require("body-parser");

// Import the quotes route file (defined in routes/quoteRoutes.js)
const quoteRoutes = require("./routes/quoteRoutes");

// Middleware to parse incoming request bodies (urlencoded and JSON data)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the 'quotes' route for handling requests that begin with '/api/quotes'
app.use("/api/quotes", quoteRoutes(io));

// Real-time socket connection
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Set the port for the application to listen on
const port = process.env.PORT || 5000;

// Start the Express server and listen for incoming requests on the specified port
server.listen(port, () => console.log(`Quote API running on port ${port}`));
