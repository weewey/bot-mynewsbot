module.exports = function () {

	global.restify = require('restify');
	global.builder = require('botbuilder');
	global.rp = require('request-promise');

	var connector = new builder.ChatConnector({
	    appId: appId,
	    appPassword: appPassword
	});

	var server = restify.createServer();
	server.listen(process.env.port || process.env.PORT || 3978, function () {
	   console.log('%s listening to %s', server.name, server.url); 
	});
	server.post('/api/messages', connector.listen());
	  
	global.bot = new builder.UniversalBot(connector);
	// If a Post request is made to /api/messages on port 3978 of our local server, then we pass it to the bot connector to handle

	//=========================================================
	// Bots Dialogs
	//=========================================================
	var luisRecognizer = new builder.LuisRecognizer(luisModel);
	global.intentDialog = new builder.IntentDialog({recognizers: [luisRecognizer]});

	var BINGSEARCHKEY = BingSearchKey;

}