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
                    // let  _regex = new RegExp(["^", req.query[property], "$"].join(""), "i");
                    // _params[property] = _regex;
                  }
                  break;
                }
                case 'genre': {
                  let _query = req.query[property].split(',');
                  _params[property] = {$all: _query};
                  break;
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
        // res.send('GET /movies/id');
      let _objId = req.params.id;
      console.log(_objId);
      db.collection('movies').findOne(ObjectId(_objId), (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    });

    app.post('/movies', (req, res) => {
        let _movie = {
            title: req.body.title,
            director: req.body.director,
            year: req.body.year,
            genre: req.body.genre,
            rating: req.body.rating
        };
        db.collection('movies').insertOne(_movie, (error, result) => {
            if (error) {
                res.send({ 'error': 'An error has occured'} );
                // res.status(500).json(error);
            } else {
                res.send(result.ops);
            }
        });
        // res.send('POST /movies');
    });

    app.post('/favs', (req, res) => {
      let _query = { _id: ObjectId(req.body.userId) };
      let _data = { $set: { 'favIds': req.body.favIds } };
      db.collection('users').updateOne(_query, _data, (err, result) => {
        if (err) throw err;
        res.send(result.ops);
      })
    });

    app.get('/users', (req, res) => {
        // res.send('GET /users');
      db.collection('users').find({}).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
    });

    app.post('/users', (req, res) => {
        // res.send('POST /users (sign_up)');
      let _user = {
        username: req.body.username,
        password: req.body.password,
        role: '1',
        favIds: []
      };
      db.collection('users').insertOne(_user, (err, result) => {
        if (err) throw err;
        res.send(result.ops);
      });
    });

    app.post('/delete_user', (req, res) => {
      let _query = { _id: ObjectId(req.body.userId) };
      db.collection('users').deleteOne(_query, (err, result) => {
        if (err) throw err;
        res.send(result.ops);
      });
    });

    app.post('/profile', (req, res) => {
      // res.send('EDIT PROFILE');
      let _query = { _id: ObjectId(req.body.userId) };
      let _data = { $set: {
        'username': req.body.username,
        'password': req.body.password
      }};
      db.collection('users').updateOne(_query, _data, (err, result) => {
        if (err) throw err;
        res.send(result);
      })
    });

    app.post('/login', (req, res) => {
      db.collection('users').findOne({
        'username': req.body.username,
        'password': req.body.password
      }, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    });

    app.post('/login/:id', (req, res) => {
      let _objId = req.params.id;
      db.collection('users').findOne(ObjectId(_objId), (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    })
};