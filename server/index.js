/**
 * Created by jonlazarini on 29/06/17.
 */
import express from 'express';
// slackbot to be imported


export function init() {
    const app = express();
    app.set('port', (process.env.PORT || 5001));

    app.get('/', (request, response) => {
        response.send({ success: true });
    });
    app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));
    // slackbot to run in the server
}