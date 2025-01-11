const express = require('express');
const bodyParser = require('body-parser');
const { Client, Environment } = require('square');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const squareClient = new Client({
    environment: Environment.Sandbox, // Switch to Environment.Production for live
    accessToken: 'EAAAl6ovtOSh8Pmrj75yFgxo7vOfNv7zvh5AuDFVeuSH7k9sEv0HiGpTcHTzjzHa',     // Replace with your Square Access Token
});

// Endpoint to handle payments
app.post('/create-payment', async (req, res) => {
    const { sourceId, amount, currency, product } = req.body;

    try {
        const idempotencyKey = crypto.randomUUID(); // Unique key for the transaction
        const response = await squareClient.paymentsApi.createPayment({
            sourceId: sourceId,
            idempotencyKey: idempotencyKey,
            amountMoney: {
                amount: amount, // Amount in the smallest currency unit
                currency: currency,
            },
            note: `Order for ${product}`,
        });

        res.json({ success: true, result: response.result });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
