const ChromecastAPI = require('chromecast-api')
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const path = require('path')
 
const client = new ChromecastAPI()
//var device = {
 //  name:
  //   'Chromecast-4f611d25620eee450efb02612c261dc7._googlecast._tcp.local',
  //  friendlyName: 'Bedroom TV',
   // host: '10.0.0.6'}
    

app.get('/', (req, res) => res.send('hi dickhead, put /video for the movie'))
app.get('/video', function(req, res) {
    const path = 'assets/dangerclose.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  });

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
    var tings 
client.on('device', function (device) {
   // var mediaURL = 'https://feff7eff.ngrok.io/video';
    console.log(device)
    tings = device
    //device.play(mediaURL,function (err) {
    //device.setVolume(0, function (err){if (!err) console.log('vol muted') })
    //  if (!err) console.log('Playing in your chromecast')
  // })
  })

  console.log(tings)


