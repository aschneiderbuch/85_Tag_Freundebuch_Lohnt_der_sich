import fs from 'fs'

// ! wenn wir selbst fs.writeFile() mit new Promise() usw schreiben, dann hier in diese Datei rein
// ! aber jetzt arbeiten wir mit MongoDB abfragen usw.

const DB_PATH = process.env.DB_PATH || './db.json'

