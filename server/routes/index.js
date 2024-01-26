const express = require('express')
const path = require('path')
const { readFile } = require('fs').promises
const router = express.Router()
const { PDFDocument } = require('pdf-lib');
const moment = require("moment");
const jwt = require('jsonwebtoken')

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

    router.post('/generate/:filename', async (req, res) => {
        try {
            const decodedToken = jwt.verify(req.cookies.token, process.env.NEXTAUTH_SECRET)
            if (!decodedToken) throw new Error("token invalid")
            const pdfData = await readFile(path.join(__dirname, '..', 'doc', 'umrah-visa-application-form.pdf'));
            const pdfDoc = await PDFDocument.load(pdfData)
            const form = pdfDoc.getForm()
            const dataSrc = req.body.data

            Object.entries(dataSrc).map(([field, value]) => {
                const dataMap = pdfDataMap.find(dat => dat.field === field)

                if (dataMap) {
                    const pdfField = dataMap.pdfField
                    const fieldType = dataMap.type

                    if (fieldType === 'textField') {
                        const inputField = form.getTextField(pdfField)
                        if (!isNaN(new Date(value))) {
                            inputField.setText(moment(value).format("DD/MM/YYYY"))
                        } else {
                            inputField.setText(value)
                        }
                    } else if (fieldType === 'checkbox') {
                        let thisPdfField = pdfField.map(f => f.toLowerCase().replace(/chk/g, ''))
                        const selectedCheckbox = thisPdfField.indexOf(value.toLowerCase())
                        const checkboxField = form.getCheckBox(pdfField[selectedCheckbox])
                        checkboxField.check()
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
            res.json({ status: error })
        }
    })

    router.post('/link/verify/:uuid/:socketid/:agentid', async (req, res) => {
        try {
            const mainSocket = socketio.sockets.sockets.get(req.params.socketid);
            if (mainSocket) {
                mainSocket.emit('scanned:phone:qr', req.params.agentid)
                res.json({ status: 'ok' })
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