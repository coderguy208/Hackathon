import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory array acting as our hackathon database
const users = [];

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'An account with that email already exists.' });
  }
  
  const newUser = { id: crypto.randomUUID(), name, email, password };
  users.push(newUser);
  
  res.status(201).json({ user: newUser });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  
  res.status(200).json({ user });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});