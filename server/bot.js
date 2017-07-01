/**
 * Created by jonlazarini on 30/06/17.
 */
var Botkit = require('botkit');

export function init() {


    var controller = Botkit.slackbot({
        debug: false
        //include "log: false" to disable logging
        //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
    });
// connect the bot to a stream of messages
    controller.spawn({
        token: process.env.SLACK_BOT_TOKEN || '',
    }).startRTM();
// give the bot something to listen for.
    controller.hears('.*?$',['direct_mention'], function(bot, message) {
        //console.log('message: ' + JSON.stringify(message));
        var user = {name: message.user, handle: message.user, id: message.user};
        //TODO Fix context with other library - NPL or grammar, tracery for example
        var context = listener.interpret(user, message.text);
        var response = context.actAndRespond();
        bot.reply(message, response.textResponse);
    });
// give the bot something to listen for.
    controller.hears('.*?$',['mention'], function(bot, message) {
        console.log('message: ' + JSON.stringify(message));
        var results = "this is a canned response to ambient mentions from " + message.user
        bot.reply(message, results);
    });
    controller.hears('.*?$',['direct_message'],function(bot, message) {
        console.log('message: ' + JSON.stringify(message));
        var results = "this is a canned response to a direct message"
        bot.reply(message, results);
    });
    controller.hears('.*?$',['ambient'],function(bot, message) {
        console.log('message: ' + JSON.stringify(message));
        var results = "this is a canned response to ambient chat from user " + message.user;
        //TODO Fix with the correct user
        if (message.user !== "U43MDPZEF") {
            setTimeout(function() {
                bot.reply(message, results);
            }, 500);
        }
    });


}
