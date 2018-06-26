const path = require("path");
const express = require("express");

const app = express();

const publicPath = path.join(__dirname, "..");
const port = process.env.PORT || 4000;

console.log(__dirname);
app.use(express.static(publicPath));

app.get("*", (req, res) => {
  const indexFile = path.join(publicPath, "index.html");

  res.sendFile(indexFile);
});

app.listen(port, () => {
  console.log("Running on port 4000");
});
