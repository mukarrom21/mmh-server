const express = require('express');
const cors = require('cors');

// call express
const app = express();
// create port
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json())

// test api on website
app.get('/', (req, res) => {
    res.send("Welcome to Mukarrom Hosain Server. test-1")
})

// test api on console
app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})