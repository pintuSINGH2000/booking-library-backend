import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookSetRoutes from './routes/bookSetRoutes.js';
import masterDataRoutes from './routes/masterDataRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'School Book Inventory API is running' });
});

app.use('/api/book-set', bookSetRoutes);
app.use('/api/master', masterDataRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
