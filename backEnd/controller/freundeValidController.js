// Datenbank Zugriff holen
import { CLIENT_RENEG_WINDOW } from 'tls'
import { getDb } from '../util/db.js'

// Collection definieren
const COL_FREUNDE_VALID = 'freundeValid'

// ! create nur 1x ausführen, dann in DB speichern und dann nur noch updaten
export const createFreundeValid = async (req, res) => {
    try {
        // console.log(req.body)
        const db = await getDb()
        // createCollection zum spezifischen validieren
        const freunde = await db.createCollection(COL_FREUNDE_VALID, {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    title: 'Freund',

                    // ! required = Pflichtfelder
                    required: ['vorname',
                        'nachname',
                        'geburtstag',
                        'handynummer',
                        'e_Mail_Adresse',
                        'beruf',
                        'verdienst',
                        'selbststaendig',
                        'war_schon_Kunde'],

                    // ! properties = bsonType = Validierung ob number String usw     
                    // ! und description = Beschreibung
                    properties: {
                        vorname: {
                            bsonType: 'string',
                            description: 'muss String sein'
                        },
                        nachname: {
                            bsonType: 'string',
                            description: 'muss String sein'
                        },
                        geburtstag: {
                            bsonType: 'string',
                            description: 'muss String sein'
                        },
                        handynummer: {
                            bsonType: 'string'
                        },
                        e_Mail_Adresse: {
                            bsonType: 'string'
                        },
                        beruf: {
                            bsonType: 'string'
                        },
                        verdienst: {
                            bsonType: 'int'
                        },
                        selbststaendig: {
                            bsonType: 'string',
                            description: 'muss Boolean sein'
                        },
                        war_schon_Kunde: {
                            bsonType: 'string',
                            description: 'muss Boolean sein'
                        }
                    }
                }
            }
        })//.insertOne(req.body)
        console.log(typeof freunde)
        // res.status(293).json(freunde) // ! .json() führt zu Fehler so wie independez Array
        res.status(293).send('hat geklappt') // ! hier darf keine   freunde    rein !!!
    } catch (err) {
        console.log({ message: `Fehler bei postFreundeValid: ${err}` })
        res.status(593).send({ message: `Fehler bei postFreundeValid: ${err}` })
    }
}



export const postFreundeValid = async (req, res) => {
    try {
        console.log(req.body)
        const db = await getDb()
        const freunde = await db.collection(COL_FREUNDE_VALID).insertOne(req.body)
        console.log(freunde)
       // res.status(294).json(freunde) // ! .json() führt zu Fehler so wie independez Array
        res.status(294).send(freunde)

    }catch (err) {
        console.log({ message: `Fehler bei postFreundeValid: ${err}`})
        res.status(594).send({ message: `Fehler bei postFreundeValid: ${err}`})
    }
}