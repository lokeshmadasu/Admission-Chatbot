const express = require('express')
const bodyParser = require('body-parser')

// Load configuration
//require('./config')
const bot = require('./bot')

const port = process.env.PORT||5000 
// Start Express server
const app = express()
app.use(bodyParser.json())

var username

// Handle / route
app.use('/', (request, response) => {
  console.log(request.body)
  response.send("hello world")
  username=request.body.message.data.userName
  username=username.split(" ")[0]
  exports.username=username
  bot.reply(request, response,username)
    .then(success => {
      console.log(success)
      if (!response.headersSent) { response.status(200) }
    }).catch(error => {
      console.log('Error in your bot:', error)
      if (!response.headersSent) { response.sendStatus(400) }
    })
})
// Run Express server, on right port
app.listen(port, () => {
  console.log('Our bot is running on port 5000')
})
