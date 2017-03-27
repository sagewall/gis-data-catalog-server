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

router.route('/datasets')
  .post((req, res) => {
    const dataset = new Dataset();
    dataset.name = req.body.name;
    dataset.date = req.body.date;
    dataset.about = req.body.about;
    dataset.tags = req.body.tags;
    dataset.downloadUrl = req.body.downloadUrl;
    dataset.dynamicMapLayer = req.body.dynamicMapLayer;
    dataset.lat = req.body.lat;
    dataset.lon = req.body.lon;
    dataset.zoom = req.body.zoom;

    dataset.save((err) => {
      if (err) {
        res.send(err);
      }

      res.json({message: 'Dataset created'});
    })
  })

  .get((req, res) => {
    Dataset.find((err, datasets) => {
      if (err) {
        res.send(err);
      }

      res.json(datasets);
    })
  });

router.route('/datasets/:_id')
  .get((req, res) => {
    Dataset.findById(req.params._id, (err, dataset) => {
      if (err) {
        res.send(err);
      }

      res.json(dataset);
    })
  })

  .put((req, res) => {
    Dataset.findById(req.params._id, (err, dataset) => {
      if (err) {
        res.send(err);
      }

      dataset.name = req.body.name;
      dataset.date = req.body.date;
      dataset.about = req.body.about;
      dataset.tags = req.body.tags;
      dataset.downloadUrl = req.body.downloadUrl;
      dataset.dynamicMapLayer = req.body.dynamicMapLayer;
      dataset.lat = req.body.lat;
      dataset.lon = req.body.lon;
      dataset.zoom = req.body.zoom;

      dataset.save((err) => {
        if (err) {
          res.send(err);
        }

        res.json({message: 'Dataset updated'})
      })
    })
  })

  .delete((req, res) => {
    Dataset.remove({
      _id: req.params._id
    }, (err, dataset) => {
      if (err) {
        res.send(err);
      }

      res.json({message: 'Successfully deleted'});
    })
  });

router.get('/datasets/search/:name', (req, res) => {
  const searchExpression = new RegExp(req.params.name, 'i');
  Dataset.find({
    name: searchExpression
  }, (err, datasets) => {
    if (err) {
      res.send(err);
    }

    res.json(datasets);
  })
});

module.exports = router;