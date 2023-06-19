const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5001;
// Middleware 
app.use(cors())
// MONGODB
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@doctors.xjmaqrk.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const servicesCollection =  client.db("doctors_portal").collection('services');
        // 
        app.get('/services', async(req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('doctors Backend worked')
})

app.listen(port, () => {
    console.log('backend worked:', port)
})