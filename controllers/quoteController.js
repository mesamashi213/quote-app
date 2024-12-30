const { Quote } = require("../config/db");
const sendQuoteEmail = require("../utils/email");
const validateQuoteInput = require("../validations/quote");
const { v4: uuidv4 } = require("uuid");

// Controller function to handle sending a quote
exports.sendQuote = async (req, res) => {
  const { errors, isValid } = validateQuoteInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Extract recipientEmail from the request body
  const { recipientEmail } = req.body;
  // Generate a unique quoteId using UUID
  const uuid = uuidv4().replace(/-/g, "");
  const quoteId = `Q${uuid.slice(0, 8).toUpperCase()}`;

  // Save quote in the database
  try {
    const quote = await Quote.create({ recipientEmail, quoteId });

    // Send email
    await sendQuoteEmail(recipientEmail, quoteId);

    res.status(200).json({ message: "Quote sent successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller function to retrieve a specific quote by quoteId
exports.getQuote = async (req, res) => {
  const { quoteId } = req.params;

  try {
    const quote = await Quote.findOne({
      where: { quoteId }, // Find the quote by quoteId
    });

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    res.status(200).json(quote); // Return the found quote
  } catch (err) {
    console.error("Error fetching quote:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller function to fetch all quotes from the database
exports.allQuotes = async (req, res) => {
  try {
    // Fetch all quotes from the database
    const quotes = await Quote.findAll({
      order: [["id", "ASC"]],
    });

    if (!quotes || quotes.length === 0) {
      return res.status(404).json({ error: "No quotes found" });
    }

    // Return all quotes in the response
    res.status(200).json(quotes);
  } catch (err) {
    console.error("Error fetching quotes:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller function to handle the decision (accept/reject) for a specific quote
exports.quoteDecision = async (req, res) => {
  const { quoteId, decision } = req.params;

  try {
    // Find the quote by its quoteId
    const quote = await Quote.findOne({ where: { quoteId } });

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    quote.status = decision;
    await quote.save();

    // Emit real-time update to all connected clients
    req.app
      .get("io")
      .emit("quote-status-updated", { quoteId, status: decision });

    res.status(200).json({ message: "Quote status updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
