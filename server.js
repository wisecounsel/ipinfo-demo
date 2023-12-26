const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/getIpInfo", async (req, res) => {
  const ip = req.query.ip;
  const token = process.env.IPINFO_API;

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
