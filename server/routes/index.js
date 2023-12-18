const express = require('express')
const { writeFile, readFile, unlink } = require('fs').promises
const router = express.Router()
const io = require('../api');

module.exports = (socketio) => {

    router.post('/create', async(req, res) => {
        try {
            await writeFile(`server/data/${req.body.id}`, req.body.data)
            res.json({status: 'ok'})
        } catch (error) {
            console.error(error)
            res.json({status: 'fail'})
        }
    })
    
    router.get('/read/:id', async(req, res) => {
        try {
            const filePath = `server/data/${req.params.id}`
            const data = await readFile(filePath, 'utf-8')
            res.json({
                status: 'ok',
                data: data
            })
        } catch (error) {
            console.error(error)
            res.json({status: 'fail'})
        }
    })
    
    router.post('/link/:uuid/:socketid', async(req, res) => {
        try {
            const mainSocket = socketio.sockets.sockets.get(req.params.socketid);
            if (mainSocket) {
                mainSocket.emit('scanned:phone:qr', 'hello world')
                res.json({ status: 'ok' })
                console.log('Linked:::', 'uuid:', req.params.uuid, 'socketid:', req.params.socketid)
            } else {
                console.error('socket does not exist', req.params.socketid)
                res.json({ status: 'socket error' })
            }
        } catch (error) {
            console.error(error)
        }
    })

    return router
}