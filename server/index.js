const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { addToWaitlist, getVisitCount, incrementVisitCount } = require('./googleSheets');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post('/api/join-waitlist', async (req, res) => {
  try {
    const { name, email, phone, expectation } = req.body;
    const code = uuidv4();
    const ip = req.ip;

    await addToWaitlist(name, email, phone, expectation, code, ip);

    res.json({ code });
  } catch (error) {
    console.error('Error joining waitlist:', error);
    res.status(500).json({ error: 'An error occurred while joining the waitlist' });
  }
});

app.get('/api/visit-count/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const ip = req.ip;

    const visitCount = await getVisitCount(code);
    const isOwner = await checkIfOwner(code, ip);

    if (!isOwner) {
      await incrementVisitCount(code);
    }

    res.json({ visitCount, isOwner });
  } catch (error) {
    console.error('Error getting visit count:', error);
    res.status(500).json({ error: 'An error occurred while getting the visit count' });
  }
});

async function checkIfOwner(code, ip) {
  // Implement this function to check if the IP matches the one stored for the code
  // Return true if it's the owner, false otherwise
  // For now, we'll return false to always increment the count
  return false;
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});