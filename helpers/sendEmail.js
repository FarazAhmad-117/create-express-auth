const nodemailer = require("nodemailer");

/**
 * Send an email using NodeMailer
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML content for the email
 * @returns {Promise<void>}
 */
const sendEmail = async (to, subject, html) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // Email from .env
        pass: process.env.EMAIL_PASSWORD, // Email password from .env
      },
      tls: {
        rejectUnauthorized: false, // Ignore certificate errors
      },
    });

    // Email options
    const mailOptions = {
      from: `"Auth System" <${process.env.EMAIL_USER}>`, // Sender address
      to, // Recipient
      subject, // Subject line
      html, // HTML body
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Unable to send email");
  }
};

module.exports = sendEmail;
