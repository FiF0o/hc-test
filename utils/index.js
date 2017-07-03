/**
 * Created by jonlazarini on 02/07/17.
 */
const request = require('request');

export const sendMessageToSlackResponseURL = (responseURL, JSONmessage) => {
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
