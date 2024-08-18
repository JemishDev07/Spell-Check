const path = require("path");
const express = require("express");
const hbs = require("hbs");
const spellcheck = require("./utils/spellcheck");
const { title } = require("process");
const { error } = require("console");

//Define Express:
const app = express();
const port = process.env.port || 8080;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Spell Checker",
    name: "Jemish Kheni",
  });
});

app.get("/spellcheck", (req, res) => {
  console.log(req);

  const text = req.body.text;

  spellcheck(text, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Unable to fetch data to check spell" });
    } else {
      res.json(data);
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "History",
    aboutText:
      "At Spell Checker, we're dedicated to making your writing flawless and professional. Our spell check app leverages advanced algorithms to detect and correct spelling errors with precision. Whether you're a student, professional, or creative writer, our tool ensures that your words always leave a lasting impact. Easy to use and highly efficient, Spell Checker is your go-to solution for error-free communication.",
    name: "Jemish Kheni",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact Us",
    contactTitle: "If you have any question, then feel free to ask any time.",
    contactText: "Mon - Sun: 24 Hours",
    name: "Jemish Kheni",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Jemish kheni",
    errorMessage: "Page Not Found",
  });
});

//start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
