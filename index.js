var Twit = require('twit')
var T = new Twit({
    consumer_key:         'huEBqMY9jrxj5d2UaOWB68GvX',
    consumer_secret:      'RdrNZ7OZ8QL3RVsAvqGP3NhYUGZdIms9Kd63UO3usHZQP4wjgU',
    access_token:         '764528086511517696-4IFdcONcqvjEldGPsMAptVmmMT0N1vk',
    access_token_secret:  'qbvmCD7P1T7PZyI9hMIAl71vIIJzbsjsuBb3Gaojl13Oq',
})
var users = ["10228272", "155659213", "783214"];
var stream = T.stream('statuses/filter', {follow: users});
stream.on('tweet', function (tweet) {
    if (users.indexOf(tweet.user.id_str) > -1) {
        console.log(tweet.user.name + ": " + tweet.text);
        T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
            console.log(data)
        })
    }
})