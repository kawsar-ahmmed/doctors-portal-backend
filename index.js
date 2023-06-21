const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());















const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const servicesCollection = client.db("doctors_portal").collection('services');
        const bookingsCollection = client.db("booked").collection('booking');

        /**
         * Api naming convention
         * app.get('/booking)
         */
        // 
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        //
        app.post('/booking', async (req, res) => {
            const booking = req.body;
            const query = {treatment: booking.treatment, data: booking.data, patient: booking.patient};
            const exists = await bookingsCollection.findOne(query);
            if (exists) {
                return res.send({success: false, booking: exists});
            };
            const result = await bookingsCollection.insertOne(booking);
            return res.send({success: true, result});

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