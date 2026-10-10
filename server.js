import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ message: "Local backend is running" });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});