module.exports = function () {
    //process.env variables defined in Azure if deployed to a web app. For testing, place IDs and Keys inline
    global.appId = process.env.MICROSOFT_APP_ID ? process.env.MICROSOFT_APP_ID : '',
    global.appPassword = process.env.MICROSOFT_APP_PASSWORD ? process.env.MICROSOFT_APP_PASSWORD : ''
    global.luisModel = process.env.LUIS_MODEL ? process.env.LUIS_MODEL : 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/c38cbad4-7c65-4830-bf5e-e5714df70bbb?subscription-key=cef07631dcd44adeae2691046802ba7c&staging=true&verbose=true&timezoneOffset=8.0&q=';
  	global.BingSearchKey = '3d31dc1880154a008c225537b4ae5ecc';
}