const express = require('express')
const path = require('path')
const { writeFile, readFile, unlink } = require('fs').promises
const { createReadStream } = require('fs')
const router = express.Router()
const { PDFDocument } = require('pdf-lib');

const pdfDataMap = [{
    field: 'firstName',
    pdfField: 'firstname',
    type: 'textField'
}, {
    field: 'lastName',
    pdfField: 'lastname',
    type: 'textField'
}, {
    field: 'sex',
    pdfField: ['chkMale', 'chkfemale'],
    type: 'checkbox'
}, {
    field: 'birthDate',
    pdfField: 'dob',
    type: 'textField'
}, {
    field: 'nationality',
    pdfField: 'pnationality',
    type: 'textField'
}, {
    field: 'documentNumber',
    pdfField: 'passnum',
    type: 'textField'
}, {
    field: 'issuingState',
    pdfField: 'placeofissue',
    type: 'textField'
}, {
    field: 'expirationDate',
    pdfField: 'expdate',
    type: 'textField'
}, {
    field: ['firstName', 'lastName'],
    pdfField: 'fullname',
    type: 'textField'
}]


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

    router.post('/generate/:filename', async(req, res) => {
        try {
            const pdfData = await readFile(path.join(__dirname, '..', 'doc', 'umrah-visa-application-form.pdf'));
            const pdfDoc = await PDFDocument.load(pdfData)
            const form = pdfDoc.getForm()
            const fields = form.getFields()
            
            const dataSrc = req.body.data

            Object.entries(dataSrc).map(([field, value]) => {
                const dataMap = pdfDataMap.find(dat => dat.field === field)
                
                if (dataMap) {
                    const pdfField = dataMap.pdfField
                    const fieldType = dataMap.type
                    
                    if (fieldType === 'textField') {
                        const inputField = form.getTextField(pdfField)
                        inputField.setText(value)
                    }
                }
            })

            const pdfBytes = await pdfDoc.save()
            const pdfBuffer = Buffer.from(pdfBytes.buffer, 'binary');
            res.status(200)
            res.type('pdf')
            res.send(pdfBuffer)
        } catch (error) {
            console.error(error)
            res.json({status: 'fail'})
        } finally {
            console.log('clean up');
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