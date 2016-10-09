(function() {
  var express = require('express');
  var server = express();
  var morgan = require('morgan');
  var bodyParser = require('body-parser');
  var fs = require('fs');
  var path = require('path');
  var rimraf = require('rimraf');

  server.use(morgan('dev'));
  server.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
  server.use(bodyParser.json());                                     // parse application/json
  server.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
  server.use(express.static(__dirname + '/..'));

  // db configuration
  var config = require('./config.js');
  var MongoClient = require('mongodb').MongoClient;
  var assert = require('assert');
  var dbUrl = config.database;

  var apiRoutes = express.Router();
  server.get('/', function(req, res) {
    var options = {
      root: __dirname + '/..'
    };
    res.sendFile('index.html', options); // load the single view file (angular will handle the page changes on the front-end)
  });


//================ API routes ================

//route to signup for new users (POST http://localhost:8888/signup)
  apiRoutes.post('/signup', function(req, res) {
    MongoClient.connect(dbUrl, function(err, db) {
      if(err) throw new Error('error connecting to db :' + err);
      db.collection('users').find({username:req.body.username},function(err,cursor){
        if(err) throw new Error('error finding user: '+err);
        cursor.count(function(err,count){
          if(err) throw new Error('error on cursor count: ' + err);
          if(count > 1){
            throw new Error('duplicate users detected: '+ req.body.username);
          }
          if(count === 1){
            res.json({
              success:false,
              message:'user already exist'
            });
            db.close();
          }
          else{
            var user = {};
            user.username = req.body.username;
            user.galleries = {};
            user.photos = {};
            db.collection('users').insertOne(user,function(err,result){
              if(err) throw new Error('error creating user : '+ err);
              res.json({
                success:true,
                message:'user created successfully'
              });
              var userPath = path.join(process.cwd(),'uploads',user.username);
              fs.mkdir(userPath);
              currentUser = user.username;
              db.close();
            });
          }
        });
      });
    });
  });

// route to authenticate a user (POST http://localhost:8888/authenticate)
// body = {username: username}
  apiRoutes.post('/authenticate', function(req, res) {
    MongoClient.connect(dbUrl, function(err, db){
      db.collection('users').find({username:req.body.username},function(err,cursor){
        if(err) throw new Error('error finding user: '+req.body.username);
        cursor.count(function(err,count){
          if(err) throw new Error('error on cursor count: ' + err);
          if(count > 1){
            throw new Error('duplicate users detected: '+ req.body.username);
          }
          if(count === 0){
            res.status(200).json({
              success:false,
              message:'user is not exist'
            });
            db.close();
          }
          else{
            cursor.nextObject(function(err,item){
              if(err) throw new Error('error fetching next item from cursor');
              if(item.password !== req.body.password){
                res.status(200).json({
                  success:false,
                  message:'password is incorrect'
                });
                db.close();
              }
              else{
                res.status(200).json({
                  success:true,
                  message:'authenticated successfully'
                });
                currentUser = req.body.username;
                db.close();
              }
            });
          }
        });
      });
    });
  });

//route to get user info (GET http://localhost:8888/users/username)
  apiRoutes.get('/users/:username',function(req,res){
    MongoClient.connect(dbUrl, function(err, db){
      db.collection('users').findOne({username:req.params.username},function(err,result){
        assert.equal(err,null);
        res.json(result);
        db.close();
      });
    });
  });

//route to update user photos (PUT http://localhost:8888/photos/:username)
  /**
   *
   *  ["1","2"]
   *
   */
  apiRoutes.put('/photos/:username',function(req,res){
    MongoClient.connect(dbUrl,function(err,db){
      assert.equal(err,null);
      db.collection('users').updateOne({username:req.params.username},{$addToSet:{photos:{$each:req.body}}},function(err,item){
        assert.equal(err,null);
        assert.equal(item.result.ok,1);
        res.status(200).json({
          success:true,
          message:'user photos was updated successfully'
        });
        db.close();
      });
    });
  });

//route to add user galleries (POST http://localhost:8888/galleries/:username)
  /**
   * when updating galleries , expecting "galleries":"galleryName"
   */
  apiRoutes.post('/galleries/:username',function(req,res){
    MongoClient.connect(dbUrl,function(err,db){
      assert.equal(err,null);
      db.collection('users').updateOne({username:req.params.username},{$addToSet:{galleries:req.body.galleries}},function(err,item){
        assert.equal(err,null);
        assert.equal(item.result.ok,1);
        assert.equal(item.result.n,1);
        db.collection('galleries').insertOne({galleryName:req.body.galleries,galleryOwner:req.params.username},function(err,result){
          assert.equal(err,null);
          res.status(200).json({
            success:true,
            message:'user gallery was updated successfully'
          });
          db.close();
        });
      });
    });
  });

//route to delete a user (DELETE http://localhost:8888/users/username)
//TODO: remove user's galleries and photos
  apiRoutes.delete('/users/:username',function(req,res){
    MongoClient.connect(dbUrl,function(err,db){
      assert.equal(err,null);
      db.collection('users').deleteOne({username:req.params.username},function(err,result){
        assert.equal(err,null);
        if(result.deletedCount === 0){
          res.json({
            success:false,
            message:'user does not exist'
          });
        }
        else{
          var userPath = path.join(process.cwd(),'uploads',req.params.username);
          rimraf(userPath,function(err){
            assert.equal(err,null);
          });
          res.json({
            success:true,
            message:'user was removed successfully'
          });
        }
      });
    })
  });

  server.use('/api', apiRoutes);
  process.on('uncaughtException', function(err) {
    console.log(err);
  });

  server.listen(8888, function () {
    console.info('Server started!!!');
  });
})();
