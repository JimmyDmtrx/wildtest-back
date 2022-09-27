const express = require('express');
const formidable = require('express-formidable');
require('dotenv').config();
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URI);
app.use(cors());
app.use(formidable());
const { default: axios } = require('axios');
const Argonaute = require('./model/Argonautes');

app.post('/create', async (req, res) => {
  // console.log('req.query', req.query.name);
  try {
    const findExistingArgonaute = await Argonaute.findOne({
      name: req.query.name,
    });
    if (!findExistingArgonaute) {
      const newArgonaute = new Argonaute({
        name: req.query.name,
      });
      await newArgonaute.save();

      res
        .status(200)
        .json({ message: 'Argonaute added to database', data: newArgonaute });
    } else {
      // console.log('ici');
      res.status(200).json({ message: 'This Argonaute already exists' });
    }
  } catch (error) {
    console.log('la');
    res.status(400).json({ error: { message: error.message } });
  }
});

app.get('/', async (req, res) => {
  try {
    const getAllArgonautes = await Argonaute.find();
    res.status(200).json(getAllArgonautes);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

app.delete('/delete', async (req, res) => {
  // console.log(req.query);
  try {
    const deleteOneArgonaute = await Argonaute.findByIdAndDelete(req.query.id);
    // deleteOneArgonaute.save();
    res.status(200).json('removed from data base');
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

app.all('*', function (req, res) {
  res.json({ message: 'Page not found' });
});

app.listen(process.env.PORT, () => {
  console.log('Server has started');
});
