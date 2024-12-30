const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quoteController");

router.post("/send", quoteController.sendQuote);
router.get("/:quoteId", quoteController.getQuote);
router.get("/", quoteController.allQuotes);
router.post("/:quoteId/:decision", quoteController.quoteDecision);

module.exports = (io) => router;
