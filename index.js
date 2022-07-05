const express = require('express');
const cors = require('cors');

// call express
const app = express();
// create port
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json())


// -----------------------------------------
// -----------------------------------------

const uri = "mongodb+srv://myUser:6r9eJsC9S2cHReSW@mycluster.j7lpubg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const userCollection = client.db("taskManage").collection("user");
        const taskCollection = client.db("taskManage").collection("myTasks");

        // get api
        app.get('/task', async (req, res) => {
            const query = {};
            const cursor = taskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks)
        })

        app.get('/user', async (req, res) => {
            const query = {};// set how to find / with witch keyword?
            const cursor = userCollection.find(query); // find from database
            const users = await cursor.toArray(); // convert to array
            res.send(users)
        })
        // post api
        app.post('/task', async (req, res) => {
            const newTask = req.body;
            const result = await taskCollection.insertOne(newTask);
            res.send(result);
        })

        app.post('/user', async (req, res) => {
            const newUser = req.body; // get data from client-side body;
            console.log('adding new user', newUser) // check data in console
            const result = await userCollection.insertOne(newUser); // send data to database
            res.send(result) // confirm received deta from client
        })

        // delete a user
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id; // get id from client
            const query = { _id: ObjectId(id) }; // spacify user to delete
            const result = await userCollection.deleteOne(query);
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(console.dir())
// ------------------------------------------------------------
// ------------------------------------------------------------

// test api on website
app.get('/', (req, res) => {
    res.send("My Server is running")
})

// test api on console
app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})