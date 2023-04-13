// ! alles 77_Tag_...
import express from 'express'
import './util/config.js'         // dotenv da rein       damit .env Datei ausgelesen wird
import morgan from 'morgan'        // zum loggen
import cors from 'cors'            // Sicherheit, begrenzt IPs, die auf die API zugreifen dürfen
import multer from 'multer'       // zum hochladen von Forms und von Bildern       // ! content-type: application/json
import { fileTypeFromBuffer } from 'file-type'       // zum erkennen des Dateityps  und damit wir es im Buffer / Memory zwischenspeichern können
import fs from 'fs'                // zum lesen und schreiben von Dateien im FileSystem
import { v4 as uuidv4 } from 'uuid' // zum generieren von zufälligen Codes
import express_validator from 'express-validator' // zum validieren von Daten
import nodemailer from 'nodemailer' // zum versenden von Emails

import { getDb } from './util/db.js'  // zum Datebankverbindung aufbauen zu MongoDB

import { getFreunde, postFreunde } from './controller/freundeController.js'

/// ! render.com ??
// ! react => "serve": "npx serve -s ./build"
// ! vite =>     "serve": "npx serve -s ./dist"


const app = express()     // erstellt App
const BACKEND_PORT = process.env.BACKEND_PORT || 9999
const FRONTEND_VITE_PORT = process.env.FRONTEND_VITE_PORT || 5173

const upload = multer(
    {
        storage: multer.memoryStorage(), // damit wir es im Buffer / Memory zwischenspeichern können
        limits: { fileSize: 2 * 1024 * 1024 }, //  Datei/Bild auf 2MB
    }
)

// für validierung von BildDatei Endungen über das Magic Bit
const BILD_FORMAT_1 = 'jpg'
const BILD_FORMAT_2 = 'jpeg'
const BILD_FORMAT_3 = 'png'


// für Emailversand      // ! https://mailtrap.io/  Testing Dashboard
const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})


// logger für alle Requests
app.use(morgan('dev'))

// Sicherheit CORS    // ! macht evtl. bei Render.com Probleme
const CORS_WHITELIST = process.env.CORS_WHITELIST.split(',')    // aus .env Datei
app.use(cors({ origin: CORS_WHITELIST }))


// Middleware für JSON Daten
app.use(express.json())     // ! content-type: application/json


// static Routes für Bilder zum wegspeichern  // ! hinfällig wegen MongoDB
// app.use('/images', express.static('./images'))


// * Bsp. für Email getEmail    
const COL_EMAIL = 'email'
/* app.get('/api/v1/getEmail', async (req, res) => {
    try {
        const db = await getDB()
        const email = await db.collection(COL_EMAIL).findOne( )
        res.status(299).json(email)
    } catch (error) {
        console.log(error)
        res.status(599).json({ message: 'Fehler beim Email Versand' })
    }

    // ! oder ca?
    try {
        const message = {
            from: process.env.EMAIL_USER,
            to: 'anTestEmailAdresse@test.com',
            subject: 'Test Email',
            text: 'Test Email Text',
            html: '<h1>Test Email HTML</h1>'
        }
       const info =  transport.sendMail(message , (err, info) => {
            if (info) {
                console.log(info)
                res.status(599).json({ message: 'Fehler beim Email Versand' })
            } 
        })
    }catch (err) {
        console.log(err)
        res.status(599).json({ message: 'Fehler beim Email Versand' })
    }
})  */


// !     Freunde           // getFreunde fetch in Ordner Controller -> freundeController.js
app.get('/api/v1/getFreunde', getFreunde)   
app.post('/api/v1/postFreunde', postFreunde) 









// Server starten
app.listen(BACKEND_PORT, () => {
    console.log(`Server läuft auf Port: ${BACKEND_PORT}`)
})

//test