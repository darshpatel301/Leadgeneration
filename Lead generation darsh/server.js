const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/leadGeneration', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const Lead = mongoose.model('Lead', leadSchema);

// Route to handle form submission
app.post('/api/leads', async (req, res) => {
  const { name, email, phone } = req.body;

  const newLead = new Lead({ name, email, phone });

  try {
    await newLead.save();
    res.status(201).json({ message: 'Lead saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving lead', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:${PORT}');
});