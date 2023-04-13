import { MongoClient } from 'mongodb'

const URI = process.env.MONGO_URI  // dort sind die Zugangsdaten für die Datenbank hinterlegt
const DB = process.env.MONGO_DB // dort ist der Name der Datenbank hinterlegt

const client = new MongoClient(URI) // erstellt eine neue Verbindung zur Datenbank     managed praktisch alles, baut Verbindung auf, schließt Verbindung wieder, etc.

let db // ! hier speichern wir die Verbindung zur Datenbank

export const getDb = async () => {
    if (db) return db // wenn die Verbindung schon besteht, wird diese zurückgegeben
    else {
        await client.connect() // wenn die Verbindung noch nicht besteht, wird diese aufgebaut
        db = client.db(DB) // ! die Verbindung wird gespeichert
        return db // die Verbindung wird zurückgegeben damit wir so vorne beim Import benutzen können
    }
}