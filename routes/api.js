const express = require('express');
const Dataset = require('../models/dataset');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');

mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`, {
  useMongoClient: true
});

const router = express.Router();

// router.use((req, res, next) => {
//   console.log(req.originalUrl);
//   next();
// });

router.get('/', (req, res) => {
  res.send('gis-data-catalog api');
});

router.get('/datasets', (req, res) => {
  Dataset.find((err, datasets) => {
    if (err) {
      res.status(400).send(err.name);
    } else {
      res.json(datasets);
    }
  })
});

router.get('/datasets/:_id', (req, res) => {
  Dataset.findById(sanitize(req.params._id), (err, dataset) => {
    if (err) {
      res.status(400).send(err.name);
    } else {
      res.json(dataset);
    }
  })
});

router.get('/datasets/search/:term', (req, res) => {
  const searchExpression = new RegExp(sanitize(req.params.term), 'i');
  Dataset.find({$or: [{name: searchExpression}, {tags: searchExpression}]}, (err, datasets) => {
    if (err) {
      res.status(400).send(err.name);
    } else {
      res.json(datasets);
    }
  })
});

router.get('/tags', (req, res) => {
  Dataset.find().distinct('tags', {}, (err, tags) => {
    if (err) {
      res.status(400).send(err.name);
    } else {
      res.json(tags);
    }
  })
});


module.exports = router;