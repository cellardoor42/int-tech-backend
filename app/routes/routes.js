module.exports = (app, db) => {
    app.get('/movies', (req, res) => {
        res.send('MOVIES');
    });
};