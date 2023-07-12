const express = require("express")
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const bodyParser = require("body-parser")
const { AccessToken } = require("twilio").jwt
require('dotenv').config()

let {
  TWILIO_ACCOUNT_SID, 
  TWILIO_USER_SID,
  TWILIO_AUTH_TOKEN
} = process.env

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post("/token", (req, res) => { 
  const {identity, room } = req.body

  const token = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_USER_SID,
    TWILIO_AUTH_TOKEN,
    { identity }
  )
 
  try {
    const videoGrant = new AccessToken.VideoGrant({ room })
    token.addGrant(videoGrant)
    
    res.status(200).json({
      identity,
      token: token.toJwt()
    })
  } catch (error) {
    res.status(401).json(error.message)
  }
})

app.listen(5004, () => console.log("Server is running on port 5004"))
