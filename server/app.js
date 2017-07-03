/**
 * Created by jonlazarini on 29/06/17.
 */
import express from 'express';
import slackBot from './services/SlackBot';
import path from 'path';

// import slackWebClient from './services/SlackWebClient';
import SlackOAuth from './services/SlackOAuth';


const app = express();
//TODO Add web dev server to serve static files
app.use('dist', express.static(path.join(__dirname, 'dist')))
// files for auth
app.use(express.static(path.join(__dirname, '..', 'static')))

app.get('/', (request, response) => {
    response.send({ success: true });
});

SlackOAuth(app);
app.use('/slack', require('./routes/actions')) // listen to button actions
app.use('/slash-commands', require('./routes/slash-commands'))
slackBot();
// slackWebClient.start(app);


app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404;
    // send payload error to the next middleware via next() callback
    next(err)
})

app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(`Seems that you got lost    ¯¯\\_(ツ)_/¯    ['/books', '/genres'] are available!`)
})

module.exports = app;


