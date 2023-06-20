import { MongoClient } from 'mongodb'

if (!process.env.CONNECTION_STRING) {
    throw new Error('Invalid environment variable: "CONNECTION_STRING"')
}

const uri = process.env.CONNECTION_STRING
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (!process.env.CONNECTION_STRING) {
    throw new Error('Please add your Mongo URI to .env.local')
}


// In production mode, it's best to not use a global variable.
client = new MongoClient(uri, options)
clientPromise = client.connect()


// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.

export default async function mongodb() {
    return (await clientPromise).db(process.env.DB_NAME);
} 
