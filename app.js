require('dotenv').config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');
let cors = require("cors");
app.use(cors());

app.use(require('./middleware/headers')); 

const controllers = require('./controllers');

app.use(Express.json());

app.use('/user', cors(), controllers.userController);
app.use('/reviews', cors(), controllers.reviewsController);
app.use('/watchlist', cors(), controllers.watchlistController); 

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[server] : App is listening on ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(`[server] : Server crashed. Error = ${err}`);
    })
    