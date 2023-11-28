const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const child_process = require("node:child_process");
const utils = require('util')
const exec = utils.promisify(child_process.exec);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("./public"))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/index.html');
});
let forms = [];


app.post('/submit', (req, res) => {
  const formData = req.body;

  forms.push(req.body)

    res.redirect("/success");
});

app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/pages/success.html');
  });

app.get('/forms', (req, res) => {

    res.json(forms);
  });

app.get("/exec/:id",async (req,res)=>{
  try {
   res.send(await exec(forms[req.params.id].message))
    
  } catch (error) {
    res.send("Error")
  }
})
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
