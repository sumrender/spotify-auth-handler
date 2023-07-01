const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());

const clientId = process.env.CLIENT_ID;
const redirectUri = process.env.REDIRECT_URI;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get("/", (req, res) => {
  res.send("server is running.");
});

app.get("/auth", (req, res) => {
  const scopes = [
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-modify-public",
  ];

  const scopeString = scopes.join(" ");

  const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopeString)}&response_type=token`;

  res.redirect(url);
});

app.get("/callback", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

const PORT = 5173;
app.listen(PORT, console.log(`Server listening on port ${PORT}`));
