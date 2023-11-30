const express = require("express");

let users = [
  {
    id: 1,
    name: "Alice",
    age: 25,
    email: "alice@example.com",
  },
  {
    id: 2,
    name: "Bob",
    age: 30,
    email: "bob@example.com",
  },
  {
    id: 3,
    name: "Charlie",
    age: 28,
    email: "charlie@example.com",
  },
  {
    id: 4,
    name: "David",
    age: 27,
    email: "david@example.com",
  },
  {
    id: 5,
    name: "Eva",
    age: 29,
    email: "eva@example.com",
  },
];

const app = express();
app.use(express.json());

app.get("/userlist", (req, res) => {
  res.status(200).json(users);
});

app.post("/new-user", (req, res) => {
  const user = req.body;

  if (Object.keys(user).length != 0) {
    console.log(user);
    users.push(user);
    res.status(200).send("Utente aggiunto!");
  } else {
    res.status(500).send("Errore interno");
  }
});

app.get("/:id", (req, res) => {
  const id = JSON.parse(req.params.id);
  const findUser = users.filter((user) => user.id === id);

  if (findUser.length > 0) {
    res.status(200).json(findUser);
  } else {
    res.status(500).send("Errore interno");
  }
});

app.patch("/modifiedUser/:id", (req, res) => {
  const idPatch = req.params.id;
  const data = req.body.name;

  console.log(idPatch);
  console.log(data);

  const utenteFiltrati = users.find((utente) => {
    return utente.id == idPatch;
  });

  utenteFiltrati.name = data;

  const index = users.indexOf(utenteFiltrati);

  users.splice(index, 1, utenteFiltrati);

  console.log(users);

  res.status(200).send(users);
});

app.delete("/deleteUser/:id", (req, res) => {
  const idDelete = req.params.id;
  const filter = users.filter((item) => {
    return item.id != idDelete;
  });
  console.log(filter)

  users = [...filter];
  res.status(200).send(users);
});

app.listen(3005, () => {
  console.log("Server is running");
});
