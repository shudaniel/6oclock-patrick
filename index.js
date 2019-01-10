require('dotenv').config();
const fs = require('fs');
var Twit = require('twit')
var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_SECRET
})

var b64content = fs.readFileSync('./6oclock.gif', { encoding: 'base64' })

function checkTime() 
{
    var d = new Date(); // current time
    var hours = d.getHours();
    var minutes = d.getMinutes();

    return (hours == 18 && minutes == 0) 
}

var writeTweet = function() 
{
    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
      // now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters
      var mediaIdStr = data.media_id_string
      var altText = "6 o'clock"
      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

      T.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
          // now we can reference the media and post a tweet (media will attach to the tweet)
          var params = { status: 'Time for Patrick to come home and change Junior\'s diaper. #spongebob #patrick #rockabyebivalve #6oclock', media_ids: [mediaIdStr] }

          T.post('statuses/update', params, function (err, data, response) {
            console.log(data)
          })
        }
      })
    })
}

function sleep(ms) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() 
{
    while(true)
    {  
        if(checkTime())
        {
          writeTweet()
          await sleep(81000000);  // Wait 22.5 hours 
        }
        else
        {
          await sleep(30000); // Wait 30 sec and check again
        }
      
    }
}

run()
