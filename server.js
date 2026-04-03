const express = require("express");

const app = express();

app.use(express.static(__dirname));

// Redirect instead of proxying game files, to keep runtime on source domains
app.get(["/ninja-wasm", "/ninja-wasm/", "/wasm", "/wasm/"], (req, res) => {
  res.redirect(302, "https://x.mess.eu.org/ninja-wasm/");
});

app.get(["/ninja-js", "/ninja-js/", "/js", "/js/"], (req, res) => {
  res.redirect(302, "https://x.mess.eu.org/ninja-js/");
});

app.get("/mess", (req, res) => {
  res.redirect(302, "https://mess.eu.org/");
});

app.get("/servers", (req, res) => {
  res.redirect(302, "https://servers.eaglercraft.com/");
});

app.listen(3000, () => {
  console.log("SlackCraft launcher running at http://localhost:3000");
});
