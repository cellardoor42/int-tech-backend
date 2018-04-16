const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const expressMongoDb = require('express-mongo-db');
const cors = require('cors');
const app = express();

const port = 8000;
const url = 'mongodb://localhost:27017/db';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// mongoClient.connect(url, (err, db) => {
//     if (err) throw err;
//     console.log('Database connected');
//     require('./app/routes')(app, db);
//     app.listen(port, () => {
//         console.log('listening port ' + port);
//     });

//     db.close();
// });

mongoClient.connect(url, (err, client) => {
    if (err) throw err;
    console.log('Database connected');
    var db = client.db('db');
    require('./app/routes')(app, db);
    app.listen(port, () => {
        console.log('listening port ' + port);
    });
    initDb(db, () => {
        console.log('init db callback');
    });
    // client.close();
});

var initDb = (db, callback) => {
    // initMovies(db, callback);
    // clearDb(db, callback);
};

var clearDb = (db, callback) => {
    db.collection('movies').removeMany({});
    console.log('Collection "movies" cleared');
};

var initMovies = (db, callback) => {
    db.createCollection('movies', { capped: false, autoIndexId: true}, (err, result) => {
        console.log('Collection "movies" created');
        callback();
    });
    db.collection('movies').insertMany([
        {
            title: 'Аризонская мечта',
            director: 'Эмир Кустурица',
            year: '1993',
            genre: [ 'драма', 'мелодрама', 'комедия' ],
            rating: '10',
            posterUrl: 'https://www.kinopoisk.ru/images/film_big/11064.jpg'
        },
        {
            title: 'Донни Дарко',
            director: 'Ричард Келли',
            year: '2001',
            genre: [ 'фантастика', 'триллер', 'драма' ],
            rating: '10',
            posterUrl: 'https://www.kinopoisk.ru/images/film_big/410.jpg'
        },
        {
            title: 'Семь психопатов',
            director: 'Мартин МакДона',
            year: '2012',
            genre: [ 'комедия', 'криминал' ],
            rating: '10',
            posterUrl: 'https://www.kinopoisk.ru/images/film_big/586584.jpg'
        },
        {
            title: 'Трасса 60',
            director: 'Боб Гейл',
            year: '2001',
            genre: [ 'фантастика', 'драма', 'комедия' ],
            rating: '9',
            posterUrl: 'https://www.kinopoisk.ru/images/film_big/3563.jpg'
        },
        {
            title: 'Отель "Гранд Будапешт"',
            director: 'Уэс Андерсон',
            year: '2014',
            genre: [ 'комедия', 'детектив', 'приключения' ],
            rating: '9',
            posterUrl: 'https://www.kinopoisk.ru/images/film_big/683999.jpg'
        }], (err, result) => {
            console.log('Movies data inserted');
        });
};
