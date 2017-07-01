/**
 * Created by jonlazarini on 01/07/17.
 */
const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const MemoryDataStore = require('@slack/client').MemoryDataStore;

const bot_token = process.env.SLACK_BOT_TOKEN || '';


export default function start() {

    console.info('Creating RTM client...');
    const rtm = new RtmClient(bot_token, {
        // Sets the level of logging we require
        logLevel: 'error',
        // Initialise a data store for our client, this will load additional helper functions for the storing and retrieval of data
        dataStore: new MemoryDataStore()
    });

    // slackbot to run in the server
    /*app.post('/message', (req,res, next) => {
     const username = req.body.user_name;
     const payload = {
     text: `hello ${username}, welcome to your personal assistant!`
     }
     if(username !== 'slackbot') return res.status(200).json(payload)
     else return res.status(200).end()

     });*/
    rtm.start(); // init

    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
        console.info(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
    });

    // Wait for the client to connect
    rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
        // Get the user's name
        const user = rtm.dataStore.getUserById(rtm.activeUserId);

        // Get the team's name
        const team = rtm.dataStore.getTeamById(rtm.activeTeamId);

        // Log the slack team name and the bot's name
        console.log('Connected to ' + team.name + ' as ' + user.name);
    });

    rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
        console.log('message', message)
        // debug
        if (message.text === "Hello") {
            // var channel = "#bot-test"; //could also be a channel, group, DM, or user ID (C1234), or a username (@don)
            rtm.sendMessage("Hello <@" + message.user + ">!", message.channel);
        }
    });

}
