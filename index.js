const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.urlencoded({extended: true }));
app.use(express.json());
//Homepage and send Status 200 on success
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    res.sendStatus(200);
});
//
app.get('/not-found', (req, res) => {
    // Sends status code 404 and "Not Found" as the response body
    res.sendStatus(404);
});

app.get('/server-error', (req, res) => {
    // Sends status code 500 and "Internal Server Error" as the response body
    res.sendStatus(500);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
