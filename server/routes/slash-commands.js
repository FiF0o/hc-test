/**
 * Created by jonlazarini on 02/07/17.
 */
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
import { sendMessageToSlackResponseURL } from '../../utils';


const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* Send Buttons to users */
router.post('/send-buttons', urlencodedParser, (req, res) =>{
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

module.exports = router
