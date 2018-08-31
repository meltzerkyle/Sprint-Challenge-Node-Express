const express = require("express");

const cors = require("cors");

const projects = require("./data/helpers/projectModel.js");

const actions = require("./data/helpers/actionModel.js");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is working.");
});

//Projects CRUD Ops

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

app.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  projects
    .get(id)
    .then(project => {
      if (project.id) {
        res.status(200).json(project);
      } else {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." });
    });
});

app.get("/projects/:id/actions", (req, res) => {
  const { id } = req.params;
  projects
    .getProjectActions(id)
    .then(actions => {
      if (actions.length > 0) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: "The project has no actions." });
      }
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The actions information could not be retrieved." });
    });
});

app.post("/projects", (req, res) => {
  const newProject = req.body;

  if (newProject.name && newProject.description) {
    projects
      .insert(newProject)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({
          error: "There was an error while saving the project to the database."
        });
      });
  } else {
    res.status(400).json({
      error: "Please provide a name and a description for the project."
    });
  }
});

app.put("/projects/:id", (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  if (id != Number(id)) {
    res.status(400).json({ message: "Please enter a valid user ID." });
  } else if (name && description) {
    projects
      .update(id, req.body)
      .then(count => {
        if (count) {
          projects
            .get(id)
            .then(project => {
              if (project.id) {
                res.status(200).json(project);
              } else {
                res.status(404).json({
                  message: "The project with the specified ID does not exist."
                });
              }
            })
            .catch(err => {
              console.log("error", err);
              res.status(500).json({
                error: "The project information could not be retrieved."
              });
            });
        } else {
          res.status(404).json({
            message: "The project with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        console.log("error", err);
        res
          .status(500)
          .json({ error: "The project information could not be modified." });
      });
  } else {
    res.status(400).json({
      error: "Please provide a name and description for the project."
    });
  }
});

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  projects
    .get(id)
    .then(project => {
      projects
        .remove(project.id)
        .then(count => {
          if (count > 0) {
            res.status(200).json(project);
          } else {
            res.status(404).json({
              message: "The project with the specified ID does not exist."
            });
          }
        })
        .catch(err => {
          console.log("error", err);
          res.status(500).json({ error: "The project could not be removed." });
        });
    })
    .catch(err => {
      console.log("error", err);
      res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    });
});

//Actions CRUD Ops

app.get("/actions", (req, res) => {
  actions
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The actions information could not be retrieved." });
    });
});

app.get("/actions/:id", (req, res) => {
  const { id } = req.params;
  actions
    .get(id)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({
          message: "The action with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The action information could not be retrieved." });
    });
});

app.post("/actions", (req, res) => {
  const newAction = req.body;
  if (newAction.project_id && newAction.description && newAction.notes) {
    actions
      .insert(newAction)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({
          error: "There was an error while saving the action to the database."
        });
      });
  } else {
    res.status(400).json({
      error:
        "Please provide a project ID, description, and notes for the action."
    });
  }
});

app.put("/actions/:id", (req, res) => {
  const { project_id, description, notes } = req.body;
  const { id } = req.params;
  if (id != Number(id)) {
    res.status(400).json({ message: "Please enter a valid post ID." });
  } else if (project_id && description && notes) {
    actions
      .update(id, req.body)
      .then(count => {
        if (count) {
          actions
            .get(id)
            .then(action => {
              if (action) {
                res.status(200).json(action);
              } else {
                res.status(404).json({
                  message: "The action with the specified ID does not exist."
                });
              }
            })
            .catch(err => {
              console.log("error", err);
              res.status(500).json({
                error: "The action information could not be retrieved."
              });
            });
        } else {
          res.status(404).json({
            message: "The action with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        console.log("error", err);
        res
          .status(500)
          .json({ error: "The post information could not be modified." });
      });
  } else {
    res.status(400).json({
      error:
        "Please provide a project ID, description, and notes for the action."
    });
  }
});

app.delete("/actions/:id", (req, res) => {
  const { id } = req.params;
  actions
    .get(id)
    .then(action => {
      actions
        .remove(action.id)
        .then(count => {
          if (count > 0) {
            res.status(200).json(action);
          } else {
            res.status(404).json({
              message: "The action with the specified ID does not exist."
            });
          }
        })
        .catch(err => {
          console.log("error", err);
          res.status(500).json({ error: "The action could not be removed." });
        });
    })
    .catch(err => {
      console.log("error", err);
      res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    });
});

app.listen(8000, () => console.log("\n== API on port 8k==\n"));
