const express = require('express');
const router = express.Router();
const Dataset = require('../models/dataset');
const mongoose = require('mongoose');
const dbuser = 'public';
const dbpassword = '=2^0G]/+ZNkJ';
mongoose.connect(`mongodb://${dbuser}:${dbpassword}@ds147079.mlab.com:47079/gis-data-catalog`);

router.use((req, res, next) => {
  console.log('Something is happening.');
  next();
});

router.get('/', (req, res) => {
  res.send('gis-data-catalog-server api');
});

router.route('/datasets')
  .post((req, res) => {
    const dataset = new Dataset();
    dataset.name = req.body.name;
    dataset.date = req.body.date;
    dataset.about = req.body.about;
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

module.exports = router;