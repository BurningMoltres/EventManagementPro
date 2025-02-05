// routes/UserRegistration.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltrounds = 10;
const nodemailer = require("nodemailer");

router.post("/", async (req, res, next) => {
  const { username, password, email } = req.body;


  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "musclephantom123@gmail.com",
      pass: `${process.env.APP_PASSWORD}`,
    },
  });

  // Validate input
  if (
    typeof username !== "string" ||
    username.trim().length <= 0 ||
    typeof password !== "string" ||
    password.trim().length <= 0 ||
    typeof email !== "string" ||
    email.trim().length <= 0 ||
    !emailRegex.test(email)
  ) {
    return res.status(400).json("Incorrect parameters are passed");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltrounds);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();
    // Send email after user is successfully registered

    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: "musclephantom123@gmail.com",
        to: email, 
        subject: "Welcome to Our Platform", 
        text: `Hi ${username},\n\nThank you for registering with us!\n\nWe're excited to have you on board. Enjoy exploring our platform!`,
        html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Successful</title>
  <style>
    body {
     font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #2e6fa4;
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
      color: #555555;
      margin-bottom: 20px;
    }
    .cta-button {
      display: inline-block;
      padding: 12px 20px;
      background-color: #2e6fa4;
      color: white;
      text-decoration: none;
      font-size: 16px;
      border-radius: 5px;
      text-align: center;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888888;
      margin-top: 30px;
    }
    .footer a {
      color: #2e6fa4;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h1>Welcome to Our Platform!</h1>
    <p>Hello {{username}},</p>
    <p>Thank you for registering with us! Your account has been successfully created. You can now enjoy all the features and services we offer.</p>
    
    <p>If you need any assistance or have questions, feel free to contact our support team.</p>

    <p>
      <a href="{{login_url}}" class="cta-button">Login to Your Account</a>
    </p>

    <p>We're excited to have you onboard!</p>

    <div class="footer">
      <p>&copy; 2025 Our Platform. All rights reserved.</p>
      <p><a href="mailto:support@ourplatform.com">Contact Support</a></p>
    </div>
  </div>
</body>
</html>

    `, 
      });

     
    }

    main().catch(console.error);

    // Send success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
   
    res.status(500).json({ message: "Error registering user" });
  }
});

module.exports = router;
