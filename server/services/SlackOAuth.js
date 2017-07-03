/**
 * Created by jonlazarini on 02/07/17.
 */

export default function start(app) {

    app.get('/auth', (req, res) => {
        res.sendFile(path.join(`${__dirname}`, '..', '/static', '/add_to_slack.html'))
    });

    /** redirect url from the slack app to receives requests from slack auth api
     * For Slack to send unique temporary code to this endpoint when add_to_slack button is clicked
     * GET request from Slack servers will be sent at this enpoint **/
    app.get('/auth/redirect', (req, res) => {
        var options = {
            uri: 'https://slack.com/api/oauth.access?code='
            +req.query.code+
            '&client_id='+process.env.SLACK_CLIENT_ID+
            '&client_secret='+process.env.SLACK_CLIENT_SECRET+
            // to redirect back to the original url request - REDIRECT_URL
            '&redirect_uri='+process.env.REDIRECT_URI,
            method: 'GET'
        }
        console.log('options url: ', options)
        /** server sends back so that we know it can be trusted **/
        request(options, (error, response, body) => {
            var JSONresponse = JSON.parse(body)
            if (!JSONresponse.ok) {
                console.log(JSONresponse)
                res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
            }else {
                console.log(JSONresponse)
                res.send("Success!")
            }
        })
    })

}

// https://slack.com/oauth/authorize

/*
The following values should be passed as GET parameters:

client_id - issued when you created your app (required)
scope - permissions to request (see below) (required) //https://api.slack.com/docs/oauth-scopes
redirect_uri - URL to redirect back to (see below) (optional)
state - unique string to be passed back upon completion (optional)
team - Slack team ID to attempt to restrict to (optional)
*/

// oauth.access - access_token
