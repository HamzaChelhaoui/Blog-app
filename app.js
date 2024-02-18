const express = require('express');
const app = express();
const port = 8080;
const postRoutes = require('./routes/postRoutes');
const { logger, errorHandler } = require('./middlewars/middleware');


app.use(logger);

app.use(express.json());
app.use('/posts', postRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
