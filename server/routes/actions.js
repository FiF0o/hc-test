/**
 * Created by jonlazarini on 02/07/17.
 */
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
import { sendMessageToSlackResponseURL } from '../../utils';
import {database} from '../../database/';

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * ACTIONS - BUTTONS BOT
 *
 * curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!", "replace_original": false}' https://c0f5b5fe.ngrok.io/slack/actions/h1u9qRhGV8jXA1Sv3xqxVQcD
 *
 */
/* Listen, receive/respond to button actions/clicks */
router.post('/actions', urlencodedParser, (req, res) =>{
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

module.exports = router