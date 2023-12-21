const http = require('http');
const path = require('path')
const socketIO = require('socket.io')
const express = require('express')
const app = express();
const router = express.Router()
const server = http.createServer(app);

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


io.on('connection', socket => {
    console.log('Connected:::', socket.id);

    socket.on('scanned:phone:qr', mainSocketId => {
        socket.to(mainSocketId).emit('scanned:qr:res', { agent: socket.id })
    })

    socket.on('scanned:parsed', ({ agent, data }) => {
        data.nationality = countries.getName(data.nationality, "en")
        data.issuingState = countries.getName(data.issuingState, "en")
        data.birthDate = moment.utc(data.birthDate, "YYMMDD").format("yyyy-MM-DD")
        data.sex = data.sex.charAt(0).toUpperCase() + data.sex.slice(1).toLowerCase()
        data.expirationDate = moment.utc(data.expirationDate, "YYMMDD").format("yyyy-MM-DD")
        socket.to(agent).emit('parsed', data);
    })

    socket.on('disconnect', async () => {
        const matchingSockets = await io.in(socket.io).allSockets();
        const isDisconnected = matchingSockets.size === 0;
        if (isDisconnected) {
            console.log('Disconnected:::', socket.id)
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