const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

const { open } = require("sqlite")
const sqlite3 = require("sqlite3");

const path = require("path");
const dbpath = path.join(__dirname, "database.db");

let db = null;

const intializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbpath,
            driver: sqlite3.Database,
        });
        app.listen(5000, () => {
            console.log("Server Started at http://localhost:5000/");
        });
    } catch (error) {
        console.log(`DB Error: ${error.message}`);
        process.exit(1);
    }
};

intializeDBAndServer();


app.get('/', async (request, response) => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS invoice (
                country VARCHAR(200),
                bank_key TEXT,
                account_number INTEGER,
                reference TEXT
            );
        `;
        await db.run(createTableQuery);
        response.send('Table Created Successfully');
    } catch (e) {
        console.error(e.message);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/submit-form/', async (request, response) => {
    try {
        const invoiceDetails = request.body;
        const { country, bank_key, account_number, reference } = invoiceDetails;

        const postQuery = `
        INSERT INTO 
            invoice (country, bank_key, account_number, reference)
        VALUES (?, ?, ?, ?);
        `;
        await db.run(postQuery, country, bank_key, account_number, reference);
        response.send("Invoice Added Successfully");

    } catch (error) {
        console.log(error.message);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/invoice/', async (request, response) => {
    try {
        const getInvoiceDataQuery = `
            SELECT * FROM invoice;
        `
        const invoices = await db.all(getInvoiceDataQuery);
        response.json(invoices);

    } catch (e) {
        console.error(e.message);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app;