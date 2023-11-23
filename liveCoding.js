const express = require("express");
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 22 },
  { id: 4, name: "David", age: 28 },
  { id: 5, name: "Eva", age: 35 },
];

app.get("/", (req, res) => {
  res.status(200).json(users);
});

app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filtered = users.filter((user) => {
    return user.id === id;
  });
  /*    if (id > users.length || id < 1) {
        res.status(500).send("the user doesn't exist");
    }
 */
  if (filtered.length == 0) {
    res.status(500).send("an internal error");
  }

  res.status(200).json(filtered);
});

app.post("/newuser", (req, res) => {
  const data = req.body;
  users = [...users, data];
  res.status(200).json(users);
});

app.listen(3000, () => {
  console.log("server running");
});
