const express = require("express");

const projects = require("./data/helpers/projectModel.js");

const actions = require("./data/helpers/actionModel.js");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is working");
});

app.get("/projects", (req, res) => {
    projects
      .get()
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
        console.log("error", err);
        res
          .status(500)
          .json({ error: "The projects information could not be retrieved." });
      });
  });



app.listen(8000, () => console.log("\n== API on port 8k==\n"));
