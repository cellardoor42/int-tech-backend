module.exports = (app, db) => {
    // var ObjectId = require('mongodb').ObjectId;

    app.get('/movies', (req, res) => {
        let _params = {};
        for (let property in req.query) {
            if (req.query.hasOwnProperty(property) && property !== 'title') {
              if (property === 'director') {
                _params[property] = {$regex: req.query[property]};
              } else {
                _params[property] = req.query[property];
              }
            }
        }
        if (req.query.title !== undefined) {
            _params.title = {$regex: req.query.title};
        }
        console.log('GET /movies', _params);
        db.collection('movies').find(_params).toArray((err, result) => {
            if (err) throw err;
            res.send(result);
        });

        // db.collection('movies').find(ObjectId('5ad391d2d8708f354ccf4f1b')).toArray((err, result) => {
        //     if (err) throw err;
        //     console.log(result);
        // });
    });

    app.get('/movies/id', (req, res) => {
        res.send('GET /movies/id');
    });

    app.delete('/movies/id', (req, res) => {
        res.send('DELETE /movies/id');
    });

    app.post('/movies', (req, res) => {
        let _movie = {
            title: req.body.title,
            director: req.body.director,
            year: req.body.year,
            genre: req.body.genre,
            rating: req.body.rating
        }
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

    app.get('/users', (req, res) => {
        res.send('GET /users');
    });

    app.get('/users/id', (req, res) => {
        res.send('GET /users/id');
    });

    app.get('/user_roles', (req, res) => {
        res.send('GET /user_roles');
    });

    app.post('/users', (req, res) => {
        res.send('POST /users (sign_up)');
    });

    app.post('/login', (req, res) => {
        res.send('POST /login');
    });
};