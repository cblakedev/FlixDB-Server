require('dotenv').config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');

app.use(require('./middleware/headers')); 

const controllers = require('./controllers');

app.use(Express.json());

app.use('/user', controllers.userController);
app.use('/reviews', controllers.reviewsController);
app.use('/watchlist', controllers.watchlistController); 

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('[server] : App is listening to port 5000.');
        })
    })
    .catch((err) => {
        console.log(`[server] : Server crashed. Error = ${err}`);
    })