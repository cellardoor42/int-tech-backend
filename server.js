const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const expressMongoDb = require('express-mongo-db');
const cors = require('cors');
const app = express();

const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes')(app, {});

app.get('/', (req, res) => {
    res.send('INDEX');
});

app.listen(port, () => {
    console.log('listening port ' + port);
});
