const nodemailer = require("nodemailer");

// Creating a transporter object using 'nodemailer' to configure the email service.
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send a quote email to a recipient, providing a link to view the quote.
const sendQuoteEmail = (recipientEmail, quoteId) => {
  const url = `${process.env.REACT_APP_FRONTEND_URL}/quote/${quoteId}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: recipientEmail,
    subject: "Please Confirm Your Quote",
    html: `
      <p>Click <a href="${url}">here</a> to view and respond to the quote.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendQuoteEmail;
