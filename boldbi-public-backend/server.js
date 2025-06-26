const fs = require("fs");
const express = require("express");
const httpProxy = require("http-proxy");
const cors = require("cors");
const https = require("https");

const app = express();
const PORT = 3000;
const API_SERVICE_URL = "https://cloud.boldbi.com/bi";

// Load the trusted certificate
const ca = fs.readFileSync("boldbi.pem");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const proxy = httpProxy.createProxyServer({
  target: API_SERVICE_URL,
  agent,
  changeOrigin: true,
  secure: false,
});

// CORS and preflight handling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Proxy requests
app.use("/bi", (req, res) => {
  proxy.web(req, res);
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
