const https = require('https');
const path = require('path')
const fs = require('fs')
const socketIO = require('socket.io')
const express = require('express')
const app = express();
require('dotenv').config({ path: `.env` })

const server = https.createServer({
    key: fs.readFileSync(process.env.WEBSOCKET_KEY),
    cert: fs.readFileSync(process.env.WEBSOCKET_CERT)
}, app);

const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const apiRouter = require('./routes')

const moment = require("moment");
const countries = require("i18n-iso-countries");

const io = socketIO(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const formatBirthDate = (date) => {
    const thisDate = moment.utc(date, "YYMMDD");
    if (thisDate > moment(new Date())) {
        return thisDate.subtract(100, 'years').format("yyyy-MM-DD")
    }
    return thisDate.format("yyyy-MM-DD")
}

io.on('connection', socket => {

    socket.on('scanned:phone:qr', mainSocketId => {
        socket.to(mainSocketId).emit('scanned:qr:res', { agent: socket.id })
    })

    socket.on('scanned:parsed', ({ agent, data }) => {
        data.nationality = countries.getName(data.nationality, "en")
        data.issuingState = countries.getName(data.issuingState, "en")
        data.birthDate = formatBirthDate(data.birthDate)
        data.sex = data.sex.charAt(0).toUpperCase() + data.sex.slice(1).toLowerCase()
        data.expirationDate = moment.utc(data.expirationDate, "YYMMDD").format("yyyy-MM-DD")
        if (agent !== socket.id) {
            socket.to(agent).emit('parsed', data);
        } else { 
            socket.emit('parsed', data);
        }
    })

    socket.on('disconnect', async () => {
        const matchingSockets = await io.in(socket.io).allSockets();
        const isDisconnected = matchingSockets.size === 0;
        if (isDisconnected) {
            socket.broadcast.emit('disconnected', socket.id)
        }
    })
})

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', apiRouter(io))

server.listen(4001, () => console.log('API:4001')) 