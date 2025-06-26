const express = require("express");
const app = express();
const crypto = require("crypto");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Proxy endpoint for Bold BI API
app.use(
  "/boldbi-proxy",
  createProxyMiddleware({
    target: "https://cloud.boldbi.com",
    changeOrigin: true,
    pathRewrite: { "^/boldbi-proxy": "" },
    secure: false,
    onProxyRes: (proxyRes) => {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      proxyRes.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
    },
  })
);

app.use(
  "/bi",
  createProxyMiddleware({
    target: "https://cloud.boldbi.com",
    changeOrigin: true,
    pathRewrite: { "^/bolbi-proxy": "" },
    secure: false,
    onProxyRes: (proxyRes) => {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      proxyRes.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
    },
  })
);

app.get("text", (req, res) => {
  res.json({ test: "abd" });
});

app.get("/get-embed-token", (req, res) => {
  const embedSecret = "yJgcJrbyjY1ibbHmUF6eWoyBiWHzdF5Z"; // From Bold BI admin settings
  const userEmail = "lara.h@outlook.com"; // User email to identify
  const serverTimestamp = new Date().getTime();
  const message = userEmail + "," + serverTimestamp;

  const signature = crypto
    .createHmac("sha256", embedSecret)
    .update(message)
    .digest("hex");

  res.json({
    signature: signature,
    serverTime: serverTimestamp,
    embedUserEmail: userEmail,
  });
});

console.log("starting server");

app.listen(3000);
