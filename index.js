// Modules
require('./config')();
require('./botConnector')();
require('./dialogs/trendingNews.js')();
require('./dialogs/categoryNews.js')();
var emailSender = require('./emailSender');
var sendTopNews = require('./formatHeroCard');

//This is called the root dialog. It is the first point of entry for any message the bot receives
bot.dialog('/', intentDialog);

intentDialog.matches('Greeting','/sayHi')
    .matches('GetTrendingNews', '/trendingNews')
    .matches('GetCategoryNews', '/categoryNews')
    // .matches('AnalyseImage', '/analyseImage')
    // .matches('SendEmail', '/sendEmail')
    .onDefault(builder.DialogAction.send("Sorry, I didn't understand what you said."));

bot.dialog('/sayHi', function(session) {
    session.send('Hi there!');
    session.endDialog();
});

bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                var reply = new builder.Message()
                    .address(message.address)
                    .text('Hi there!! You can ask me about what\'s happening around the world!!');
                bot.send(reply);
            }
        });
    }
});


// bot.dialog('/analyseImage', [
//     function (session){
//         // Ask the user which category they would like
//         // Choices are separated by |
//         builder.Prompts.text(session, "Enter an image url to get the caption for it: ");
//     }, function (session, results, next){
//         // The user chose a category
//         if (results.response) {
//            //Show user that we're processing their request by sending the typing indicator
//             session.sendTyping();
//             // Build the url we'll be calling to get top news
//             var url = "https://westus.api.cognitive.microsoft.com/vision/v1.0/describe/";
//             // Build options for the request
//             var options = {
//                         method: 'POST', // thie API call is a post request
//                         uri: url,
//                         headers: {
//                             'Ocp-Apim-Subscription-Key': CVKEY,
//                             'Content-Type': "application/json"
//                         },
//                         body: {
//                             url: results.response,
//                             language: 'en'
//                         },
//                         json: true
//                     }
//             //Make the call
//             rp(options).then(function (body){
//                 // The request is successful
//                 console.log(body["description"]["captions"]);
//                 session.send(body["description"]["captions"][0]["text"]);
//             }).catch(function (err){
//                 // An error occurred and the request failed
//                 session.send("Argh, something went wrong. :( Try again?");
//             }).finally(function () {
//                 // This is executed at the end, regardless of whether the request is successful or not
//                 session.endDialog();
//             });
//         } else {
//             // The user choses to quit
//             session.endDialog("Ok. Mission Aborted.");
//         }
//     }
// ]);

// bot.dialog('/sendEmail', [
//     function(session){
//         session.send("I can send an email to your team member on Earth, what's his/her address?");
//         builder.Prompts.text(session, "Enter an image url to get the caption for it: ");
//     },
//     function(session, results)
//     {
//         var emailAddress = results.response;
//         emailSender.sendEmail(emailAddress, function(err){
//             if(!err)
//             {
//                 session.send("I've successfully sent an email to your team.");
//             }
//             else
//             {
//                 session.send("Error sending email");
//             }
//         })
//     }
// ]);