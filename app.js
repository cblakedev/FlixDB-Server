require('dotenv').config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');

app.use(require('./middleware/headers')); // UNCOMMENT UPON FINISHING MIDDLEWARE FUNCTIONALITY

const controllers = require('./controllers')

app.use(Express.json());

app.use('/user', controllers.userController);
app.use('/reviews', controllers.reviewsController);
app.use('/watchlist', controllers.watchlistController); 

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(5000, () => {
            console.log('[server] : App is listening to port 5000.')
        })
    })
    .catch((err) => {
        console.log(`[server] : Server crashed. Error = ${err}`)
    })