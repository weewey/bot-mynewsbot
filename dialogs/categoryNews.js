var sendTopNews = require('../formatHeroCard');

module.exports = function() {

    bot.dialog('/categoryNews', [
        function (session){
            // Ask the user which category they would like
            // Choices are separated by |
            builder.Prompts.choice(session, "Which category would you like?", "Technology|Science|Sports|Business|Entertainment|Politics|Health|World|(quit)");
        }, function (session, results, next){
            // The user chose a category
            if (results.response && results.response.entity !== '(quit)') {
               //Show user that we're processing their request by sending the typing indicator
                session.sendTyping();
                // Build the url we'll be calling to get top news
                var url = "https://api.cognitive.microsoft.com/bing/v5.0/news/?" 
                    + "category=" + results.response.entity + "&count=10&mkt=en-US&originalImg=true";
                // Build options for the request
                var options = {
                    uri: url,
                    headers: {
                        'Ocp-Apim-Subscription-Key': BingSearchKey
                    },
                    json: true // Returns the response in json
                }
        //Make the call
        rp(options).then(function (body){
            // The request is successful
            sendTopNews(session, results, body);
        }).catch(function (err){
            // An error occurred and the request failed
            console.log(err.message);
            session.send("Argh, something went wrong on retrieving category News. :( Try again?");
        }).finally(function () {
            // This is executed at the end, regardless of whether the request is successful or not
            session.endDialog();
        });
            } else {
                // The user choses to quit
                session.endDialog("Ok. Mission Aborted.");
            }
        }
    ]);
}