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

var initDb = (db) => {
    // initMovies(db);
    // clearDb(db);
};

var clearDb = (db) => {
    db.collection('movies').removeMany({});
    console.log('Collection "movies" cleared');
};

var initMovies = (db) => {
    db.createCollection('movies', { capped: false, autoIndexId: true}, (err, result) => {
        console.log('Collection "movies" created');
    });
    db.collection('movies').insertMany([
        {
            title: 'Аризонская мечта',
            director: 'Эмир Кустурица',
            year: '1993',
            genre: [ 'драма', 'мелодрама', 'комедия' ],
            rating: '10',
            posterUrl: 'https://www.kinopoisk.ru/images/film_big/11064.jpg',
            plot: 'Дядя Лео привык добиваться своего. А хочет он, чтобы племянник Аксель стал шафером на его свадьбе и работал в его фирме по продаже «кадиллаков». Аксель же ничего не хочет.\n' +
            '\n' +
            'Он предпочитает проводить время в компании своей возлюбленной, местной сумасшедшей Элен, и ее падчерицы Грейс, и вместе с ними предаваться мечтам. Влюбленная Элен мечтает летать как птица. Отвергнутая Грейс мечтает перевоплотиться в черепаху.\n' +
            '\n' +
            'Аксель мечтает о заснеженных просторах Аляски, где охотники-эскимосы ловят стрелозубых палтусов. Мечтает даже дядя Лео: построить бы целую гору из «кадиллаков» и забраться бы по ней на Луну…'
        },
        {
            title: 'Донни Дарко',
            director: 'Ричард Келли',
            year: '2001',
            genre: [ 'фантастика', 'триллер', 'драма' ],
            rating: '10',
            posterUrl: 'https://www.kinopoisk.ru/images/film_big/410.jpg',
            plot: 'К своим 16 годам старшеклассник Донни уже знает, что такое смерть. После несчастного случая, едва не стоившего ему жизни, Донни открывает в себе способности изменять время и судьбу. Перемены, случившиеся с ним, пугают всех, кто его окружает — родителей, сестер, учителей, друзей, любимую девушку.'
        },
        {
            title: 'Семь психопатов',
            director: 'Мартин МакДона',
            year: '2012',
            genre: [ 'комедия', 'криминал' ],
            rating: '10',
            posterUrl: 'https://www.kinopoisk.ru/images/film_big/586584.jpg',
            plot: 'Непутевый писатель потерял вдохновение и никак не может справиться с новым сценарием. Волей случая он оказывается втянутым в похищение собаки, затеянное его эксцентричными дружками. Выясняется, что украденное животное — любимый пёс главного местного гангстера, которому ничего не стоит в два счета вычислить и уничтожить оболтусов.'
        },
        {
            title: 'Трасса 60',
            director: 'Боб Гейл',
            year: '2001',
            genre: [ 'фантастика', 'драма', 'комедия' ],
            rating: '9',
            posterUrl: 'https://www.kinopoisk.ru/images/film_big/3563.jpg',
            plot: 'В легендах и мифах есть персонажи, главная задача которых — исполнять желания. У арабов это — джинны, у ирландцев — лепреконы, у китайцев — драконы, у европейцев — феи и лесные духи. А в Америке есть некто О. Ж. Грант — довольно странный и забавный человек, который тоже может исполнить любое желание. Но будьте осторожны, он очень проказлив! Вот его-то и встречает однажды Нил Оливер.\n' +
            '\n' +
            'Нил вполне доволен своей жизнью: у него обеспеченные родители, симпатичная невеста и впереди блестящая карьера юриста. Но с недавних пор по ночам ему стала сниться загадочная девушка, которую он никак не может выбросить из головы.\n' +
            '\n' +
            'Чудаковатый Грант приглашает Нила совершить поездку по таинственной автостраде 60, которой нет ни на одной карте США. И Нил бросает всё и пускается в самое невероятное и рискованное путешествие в своей жизни, решив во что бы то ни стало разыскать незнакомку из своих снов.'
        },
        {
            title: 'Отель "Гранд Будапешт"',
            director: 'Уэс Андерсон',
            year: '2014',
            genre: [ 'комедия', 'детектив', 'приключения' ],
            rating: '9',
            posterUrl: 'https://www.kinopoisk.ru/images/film_big/683999.jpg',
            plot: 'Фильм рассказывает об увлекательных приключениях легендарного консьержа Густава и его юного друга, портье Зеро Мустафы. Сотрудники гостиницы становятся свидетелями кражи и поисков бесценных картин эпохи Возрождения, борьбы за огромное состояние богатой семьи и… драматических изменений в Европе между двумя кровопролитными войнами XX века.'
        }], (err, result) => {
            console.log('Movies data inserted');
        });
};

// var initUsers = (db) => {
//   db.createCollection('users', { capped: false, autoIndexId: true}, (err, result) => {
//     console.log('Collection "users" created');
//   });
//   db.collection('users').insertOne({
//     username: 'admin',
//     password: 'admin',
//     role: '2'
//   });
// };
