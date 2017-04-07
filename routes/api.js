const express = require('express');
const Dataset = require('../models/dataset');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`);

const router = express.Router();

router.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

router.get('/', (req, res) => {
  res.send('gis-data-catalog api');
});

router.get('/datasets', (req, res) => {
  Dataset.find((err, datasets) => {
    if (err) {
      res.send(err);
    }

    res.json(datasets);
  })
});

router.get('/datasets/:_id', (req, res) => {
  if (req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
    Dataset.findById(req.params._id, (err, dataset) => {
      if (err) {
        res.send(err);
      }

      res.json(dataset);
    })
  } else {
    res.status(403).send({ error: 'Forbidden' });
  }
});

router.get('/datasets/search/:term', (req, res) => {
  const searchExpression = new RegExp(req.params.term, 'i');
  Dataset.find({$or: [{name: searchExpression}, {tags: searchExpression}]}, (err, datasets) => {
    if (err) {
      res.send(err);
    }

    res.json(datasets);
  })
});

router.get('/tags', (req, res) => {
  Dataset.find().distinct('tags', {}, (err, tags) => {
    if (err) {
      res.send(err);
    }

    res.json(tags);
  })
});


module.exports = router;