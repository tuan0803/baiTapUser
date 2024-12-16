const express = require('express');
const userRoutes = require('./routes/userRoute');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Sử dụng routes
app.use('/api', userRoutes);

// Chạy server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
