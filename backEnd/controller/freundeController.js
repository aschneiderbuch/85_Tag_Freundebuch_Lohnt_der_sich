// Datenbank Zugriff holen
import { getDb } from '../util/db.js'

// Collection definieren
const COL_FREUNDE = 'freunde'

export const getFreunde = async (req, res) => {
    try {
        const db = await getDb()
        const freunde = await db.collection(COL_FREUNDE).find().toArray()   // .count() gibt die Anzahl der Einträge zurück
        console.log(freunde)
        res.status(291).json(freunde)
    } catch (err) {
        console.log({ message: `Fehler bei getFreunde: ${err}` })
        res.status(591).json({ message: `Fehler bei getFreunde: ${err}` })
    }
}

export const postFreunde = async (req, res) => {
    try {
        console.log(req.body)
        const db = await getDb()
        const freunde = await db.collection(COL_FREUNDE).insertOne(req.body)
        res.status(292).json(freunde)
    } catch (err) {
        console.log({ message: `Fehler bei postFreunde: ${err}` })
        res.status(292).json({ message: `Fehler bei postFreunde: ${err}` })
    }
}