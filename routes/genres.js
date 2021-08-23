const Joi = require("joi");
const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Terror" },
  { id: 2, name: "Romance" },
  { id: 3, name: "Action" },
  { id: 4, name: "Mistery" },
  { id: 5, name: "Science-Fiction" },
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre not found.");
  res.send(genre);
});

router.post("/", (req, res) => {
  const { error } = ValidateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = { id: FindMaxGenreId() + 1, name: req.body.name };
  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  //If genre not found, return 404
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre not found.");
  //Validate
  //If invalid, return 400, bad request
  const { error } = ValidateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Update the genre
  genre.name = req.body.name;
  //Return the updated genre
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  //If genre not found, return 404
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre not found.");

  //Delete the genre
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  //Return the updated genre
  res.send(genre);
});

function ValidateGenre(genre) {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate({ name: genre.name });
}

function FindMaxGenreId() {
  let max = 0;
  for (let i = 0; i < genres.length; i++) {
    if (genres[i].id > max) max = genres[i].id;
  }
  return max;
}

module.exports = router;
