/**
 * Created by jonlazarini on 29/06/17.
 */
import express from 'express';
import slackBot from './slack';
// import slackWebClient from '../services/SlackWebClient'
const request = require('request');
const bodyParser = require('body-parser');
import {database} from '../database/';


const urlencodedParser = bodyParser.urlencoded({ extended: false });


function sendMessageToSlackResponseURL(responseURL, JSONmessage) {
    const postOptions = {
        uri: responseURL,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: JSONmessage
    }
    request(postOptions, (error, response, body) => {
        if (error) console.error(error) // handle errors as you see fit
    })
}


const app = express();

export function init() {
    app.set('port', (process.env.PORT || 5001));

    app.get('/', (request, response) => {
        response.send({ success: true });
    });


    /**
     * ACTIONS - BUTTONS BOT
     *
     * curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!", "replace_original": false}' https://c0f5b5fe.ngrok.io/slack/actions/h1u9qRhGV8jXA1Sv3xqxVQcD
     *
     */
    /* Listen, receive/respond to button actions/clicks */
    app.post('/slack/actions', urlencodedParser, (req, res) =>{
        res.status(200).end() // best practice to respond with 200 status
        const actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string
        const message = {
            "text": actionJSONPayload.user.name+" clicked: "+actionJSONPayload.actions[0].name,
            "replace_original": false
        }
        console.log(actionJSONPayload);
        sendMessageToSlackResponseURL(actionJSONPayload.response_url, message)
        database.ref('node').push(actionJSONPayload.user.name)
    });

    /* Send Buttons to users */
    app.post('/slack/slash-commands/send-buttons', urlencodedParser, (req, res) =>{
        console.log(req.body)
        res.status(200).end() // best practice to respond with empty 200 status code
        const reqBody = req.body
        const responseURL = reqBody.response_url
        if (reqBody.token != process.env.VERIFICATION_TOKEN) res.status(403).end("Access forbidden")
        else {
            const message = {
                "text": "This is your first interactive message",
                "attachments": [
                    {
                        "text": "Building buttons is easy right?",
                        "fallback": "Shame... buttons aren't supported in this land",
                        "callback_id": "button_tutorial",
                        "color": "#3AA3E3",
                        "attachment_type": "default",
                        "actions": [
                            {
                                "name": "yes",
                                "text": "yes",
                                "type": "button",
                                "value": "yes"
                            },
                            {
                                "name": "no",
                                "text": "no",
                                "type": "button",
                                "value": "no"
                            },
                            {
                                "name": "maybe",
                                "text": "maybe",
                                "type": "button",
                                "value": "maybe",
                                "style": "danger"
                            }
                        ]
                    }
                ]
            }
            sendMessageToSlackResponseURL(responseURL, message)
        }
    })
    /**
     *  Beginning chat bot here
     */
    slackBot();

    // slackWebClient(app);

    app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));

}
