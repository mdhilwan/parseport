const https = require('https')
const path = require('path')
const fs = require('fs')
const socketIO = require('socket.io')
const express = require('express')
const app = express()
require('dotenv').config({ path: `.env` })

const server = https.createServer(
  {
    key: fs.readFileSync(process.env.WEBSOCKET_KEY),
    cert: fs.readFileSync(process.env.WEBSOCKET_CERT),
  },
  app
)

const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const apiRouter = require('./routes')

// limit each IP to 100 request per 5 min
const limiter = rateLimit({
  limit: 100,
  windowMs: 5 * 60 * 1000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})

const moment = require('moment')
const countries = require('i18n-iso-countries')
const { decrypt, encrypt } = require('./crypt')

const io = socketIO(server, {
  cors: {
    origin: [
      'https://passport-to-visa.com',
      'https://parseport.vercel.app',
      'https://localhost',
    ],
  },
})

const formatBirthDate = (date) => {
  const thisDate = moment.utc(date, 'YYMMDD')
  if (thisDate > moment(new Date())) {
    return thisDate.subtract(100, 'years').format('yyyy-MM-DD')
  }
  return thisDate.format('yyyy-MM-DD')
}

const hydrate = (data) => {
  data.nationality = countries.getName(data.nationality, 'en')
  data.issuingState = countries.getName(data.issuingState, 'en')
  data.birthDate = formatBirthDate(data.birthDate)
  data.sex = data.sex.charAt(0).toUpperCase() + data.sex.slice(1).toLowerCase()
  data.expirationDate = moment
    .utc(data.expirationDate, 'YYMMDD')
    .format('yyyy-MM-DD')
  return data
}

io.on('connection', (socket) => {
  socket.on('scanned:phone:qr', (mainSocketId) => {
    socket.to(mainSocketId).emit('scanned:qr:res', { agent: socket.id })
  })

  socket.on('scanned:parsed', (rawData) => {
    const { agent, data, iv, uuid } = JSON.parse(atob(rawData))
    console.log('scanned:parsed', iv)
    const decrypted = JSON.parse(decrypt(data, uuid, iv))
    const encryted = encrypt(hydrate(decrypted), uuid, iv)
    const body = { parsed: encryted, iv: iv }
    if (agent !== socket.id) {
      socket.to(agent).emit('parsed', body)
    } else {
      socket.emit('parsed', body)
    }
  })

  socket.on('disconnect', async () => {
    const matchingSockets = await io.in(socket.io).allSockets()
    const isDisconnected = matchingSockets.size === 0
    if (isDisconnected) {
      socket.broadcast.emit('disconnected', socket.id)
    }
  })
})

app.use(cors())
app.use(helmet())
app.use(limiter)
app.disable('x-powered-by')
app.use(cookieParser())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', apiRouter(io))

server.listen(4001, () => console.log('API:4001'))
