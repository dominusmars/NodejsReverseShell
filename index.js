const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const child_process = require("node:child_process");
const utils = require('util')
const exec = utils.promisify(child_process.exec);

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("./public"))

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/index.html');
});
let forms = [];


// Handle form submission
app.post('/submit', (req, res) => {
  const formData = req.body;
  // Process the form data (you can add your logic here)
    forms.push(req.body)
  // Respond with a confirmation message
  res.redirect("/success");
});

app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/pages/success.html');
  });

app.get('/forms', (req, res) => {

    // Respond with a confirmation message
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
