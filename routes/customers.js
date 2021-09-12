const Joi = require("joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 12,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort({ name: 1 });
    res.send(customers);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("Genre not found.");
    res.send(genre);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = ValidateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
      name: req.body.name,
    });

    const result = await genre.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    //If invalid, return 400, bad request
    const { error } = ValidateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //If genre not found, return 404
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("Genre not found.");
    //Validate
    //Update the genre
    genre.name = req.body.name;
    const result = await genre.save();
    //Return the updated genre
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    //If genre not found, return 404
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("Genre not found.");

    //Delete the genre
    const result = await Genre.deleteOne({ _id: req.params.id });
    //Return the updated genre
    res.send(result);
  } catch (err) {
    console.log(err);
  }
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
