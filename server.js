import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { Client, Environment } from 'square';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Square Client Setup
const squareClient = new Client({
  environment: Environment.Sandbox, // Switch to Environment.Production for live
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

// MongoDB Schema and Model
const OrderSchema = new mongoose.Schema({
  squareOrderId: String,
  customerName: String,
  amount: Number,
  currency: String,
  date: { type: Date, default: Date.now },
});
const Order = mongoose.model('Order', OrderSchema);

// Square Payment Endpoint
app.post('/create-payment', async (req, res) => {
  const { sourceId, amount, currency, customerName } = req.body;

  try {
    const idempotencyKey = crypto.randomUUID(); // Unique key for the transaction
    const response = await squareClient.paymentsApi.createPayment({
      sourceId: sourceId,
      idempotencyKey: idempotencyKey,
      amountMoney: {
        amount, // Amount in the smallest currency unit
        currency,
      },
      note: `Payment by ${customerName}`,
    });

    // Save to MongoDB
    const order = new Order({
      squareOrderId: response.result.payment.id,
      customerName,
      amount,
      currency,
    });
    await order.save();

    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// MongoDB Retrieve Orders Endpoint
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
