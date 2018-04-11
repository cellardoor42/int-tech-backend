const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
// const path = require('path');
const expressMongoDb = require('express-mongo-db');
const app = express();

const port = 8000;

app.get('/', (req, res) => {
    res.send('index')
});

app.get('/api', (req, res) => {
    res.send('api is running')
});

app.listen(port, () => {
    console.log('listening port ' + port);
});
