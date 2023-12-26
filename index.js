// Import necessary modules
const express = require("express");
const axios = require("axios");
const path = require("path");

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port or default to 3000

// Middleware for parsing JSON and serving static files from 'public'
app.use(express.json());
app.use(express.static("public"));

// Route for the home page, serving index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route to get IP information using ipinfo.io API
app.get("/getIpInfo", async (req, res) => {
  const ip = req.query.ip;
  const token = process.env.IPINFO_API; // Ensure to set IPINFO_API in your environment variables

  if (!ip) {
    return res.status(400).send({ message: "IP address is required!" });
  }

  try {
    const response = await axios.get(`https://ipinfo.io/${ip}?token=${token}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving IP information",
      details: error.message,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
