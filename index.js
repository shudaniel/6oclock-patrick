const fs = require('fs');
var Twit = require('twit')
var T = new Twit({
    consumer_key:         'huEBqMY9jrxj5d2UaOWB68GvX',
    consumer_secret:      'RdrNZ7OZ8QL3RVsAvqGP3NhYUGZdIms9Kd63UO3usHZQP4wjgU',
    access_token:         '764528086511517696-4IFdcONcqvjEldGPsMAptVmmMT0N1vk',
    access_token_secret:  'qbvmCD7P1T7PZyI9hMIAl71vIIJzbsjsuBb3Gaojl13Oq',
})

var b64content = fs.readFileSync('./6oclock.gif', { encoding: 'base64' })
T.post('media/upload', { media_data: b64content }, function (err, data, response) {
  // now we can assign alt text to the media, for use by screen readers and
  // other text-based presentations and interpreters
  var mediaIdStr = data.media_id_string
  var altText = "6 o'clock"
  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

  T.post('media/metadata/create', meta_params, function (err, data, response) {
    if (!err) {
      // now we can reference the media and post a tweet (media will attach to the tweet)
      var params = { status: 'Time for Patrick to come home and change Junior\'s diaper.', media_ids: [mediaIdStr] }

      T.post('statuses/update', params, function (err, data, response) {
        console.log(data)
      })
    }
  })
})
