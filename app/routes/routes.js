module.exports = (app, db) => {
    app.get('/movies', (req, res) => {
        res.send('GET /movies');
    });

    app.get('/movies/id', (req, res) => {
        res.send('GET /movies/id');
    });

    app.delete('/movies/id', (req, res) => {
        res.send('DELETE /movies/id');
    });

    app.post('/movies', (req, res) => {
        res.send('POST /movies');
    });

    app.get('/genres', (req, res) => {
        res.send('GET /genres');
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