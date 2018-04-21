module.exports = (app, db) => {
    var ObjectId = require('mongodb').ObjectId;

    app.get('/movies', (req, res) => {
        let _params = {};
        for (let property in req.query) {
            if (req.query.hasOwnProperty(property)) {
              switch (property) {
                case 'director': case 'title': {
                  if (req.query[property] !== undefined) {
                    _params[property] = {$regex: req.query[property]};
                  }
                  break;
                }
                case 'genre': {
                  let _query = req.query[property].split(',');
                  _params[property] = {$all: _query};
                  break;
                }
                case 'rating': {
                  _params[property] = parseInt(req.query[property]);
                  break
                }
                default: {
                  _params[property] = req.query[property];
                  break;
                }
              }
            }
        }
        console.log('GET /movies', _params);
        db.collection('movies').find(_params).toArray((err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

    app.get('/movies/:id', (req, res) => {
      let _objId = req.params.id;
      console.log('GET movie by _id', _objId);
      db.collection('movies').findOne(ObjectId(_objId), (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    });

    // app.post('/movies', (req, res) => {
    //     let _movie = {
    //         title: req.body.title,
    //         director: req.body.director,
    //         year: req.body.year,
    //         genre: req.body.genre,
    //         rating: req.body.rating
    //     };
    //     console.log('POST /movies');
    //     db.collection('movies').insertOne(_movie, (err, result) => {
    //         if (err) throw err;
    //         res.send(result.ops);
    //     });
    // });

    app.post('/favs', (req, res) => {
      let _query = { _id: ObjectId(req.body.userId) };
      let _data = { $set: { 'favIds': req.body.favIds } };
      console.log('Add to favs', _query);
      db.collection('users').updateOne(_query, _data, (err, result) => {
        if (err) throw err;
        res.send(result.ops);
      })
    });

    app.get('/users', (req, res) => {
      console.log('GET /users');
      db.collection('users').find({}).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
    });

    app.post('/users', (req, res) => {
      let _user = {
        username: req.body.username,
        password: req.body.password,
        role: '1',
        favIds: []
      };
      console.log('POST /users: create new user', _user);
      db.collection('users').insertOne(_user, (err, result) => {
        if (err) throw err;
        res.send(result.ops);
      });
    });

    app.post('/delete_user', (req, res) => {
      let _query = { _id: ObjectId(req.body.userId) };
      console.log('Delete user by _id', _query);
      db.collection('users').deleteOne(_query, (err, result) => {
        if (err) throw err;
        res.send(result.ops);
      });
    });

    app.post('/profile', (req, res) => {
      let _query = { _id: ObjectId(req.body.userId) };
      let _data = { $set: {
        'username': req.body.username,
        'password': req.body.password
      }};
      console.log('Edit profile', _data);
      db.collection('users').updateOne(_query, _data, (err, result) => {
        if (err) throw err;
        res.send(result);
      })
    });

    app.post('/login', (req, res) => {
      console.log('Login', req.body);
      db.collection('users').findOne({
        'username': req.body.username,
        'password': req.body.password
      }, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    });

    app.post('/login/:id', (req, res) => {
      let _objId = req.params.id;
      console.log('Verify user _id');
      db.collection('users').findOne(ObjectId(_objId), (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    })
};