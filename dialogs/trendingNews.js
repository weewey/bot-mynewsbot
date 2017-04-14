var sendTrendingNews = require('../formatTrendingNews');

module.exports = function() {
    bot.dialog('/trendingNews',
        function (session, results, next){
            // Ask the user which category they would like
            // Choices are separated by |
            session.send("Retrieving the trending news around the world!");
            session.sendTyping();
            var url = "https://api.cognitive.microsoft.com/bing/v5.0/news/trendingtopics?mkt=en-US";
            var options = {
                uri: url,
                headers: {
                    'Ocp-Apim-Subscription-Key': BingSearchKey
                },
                json: true
            }
            //Make the call
            rp(options).then(function (body){
                sendTrendingNews(session, results, body);
            }).catch(function (err){
                // An error occurred and the request failed
                console.log(err.message);
                session.send("Argh, something went on retrieving the trending news wrong. :( Try again?");
            }).finally(function () {
                // This is executed at the end, regardless of whether the request is successful or not
                session.endDialog();
            });
        } 
    );
}