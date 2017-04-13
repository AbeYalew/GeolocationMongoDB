var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017/city';
/* GET home page. */



MongoClient.connect(url, (err, db) => {
  console.log('MongoDB Connected...');
  if(err) throw err;

  mdb = db.collection('fairfield');


router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/locations', function(req, res, next) {

  mdb.find().toArray((err, result) =>{
    if (err) throw err
    
    res.render('locations', { location: result});
    
  })
console.log('Still open ....');
})


 router.get('/location/new', function (req, res, next) {
  res.render('newLocation');
});


router.post('/location/new', function (req, res, next) {
     var newplace = {'name': req.body.name, 'catagory': req.body.category,'latitude':parseFloat(req.body.latitude),
      'longitude': parseFloat(req.body.longitude)}
  
  // req.assert('name', 'Name is required').notEmpty();
  // req.assert('category', 'Category is required').notEmpty();
  // req.assert('latitude', 'Latitude is required').notEmpty();
  // req.assert('longitude', 'Longitude is required').notEmpty();
  // const errors = req.validationErrors();

  // if (errors) {
  //   res.render('newLocation', { success: false, location: location });
  // } else {
    
 mdb.insert(newplace,(err, result) =>{
    if (err) throw err
    
   res.success = true;
      res.redirect('/locations');
  })

 
// }

})

router.get('/location/delete/:locationId', function (req, res, next) {
  mdb.deleteOne({_id: new mongodb.ObjectID(req.params.locationId)}, function (err) {
    if (err) throw err;
    
    console.log({'_id':req.params.locationId});
    res.success = true;
    res.redirect('/locations');
  });
});
  console.log('Still open...');
  
});


module.exports = router;
