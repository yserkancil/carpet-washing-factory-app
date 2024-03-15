const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/hello', (req, res) => {
    res.send('Merhaba, Dünya!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
