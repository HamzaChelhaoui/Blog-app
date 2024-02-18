const express = require('express');
const app = express();
const port = 8080;
const postRoutes = require('./routes/postRoutes');

app.use(express.json());
app.use('/posts', postRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
