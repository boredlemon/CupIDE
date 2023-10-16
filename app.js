const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/execute', (req, res) => {
  const CupCode = req.body.code;
  exec(`./cup'${CupCode}'`, (error, stdout, stderr) => {
    if (error) {
      res.send(`Cup Code: ${CupCode}\n\nError: ${stderr}`);
    } else {
      res.send(`Cup Code: ${CupCode}\n\nOutput:\n${stdout}`);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
