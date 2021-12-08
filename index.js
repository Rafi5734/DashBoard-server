const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());

//user-name: My-Dashboard

//password: xGp9HMPuuS7qL733
// mongo connection started from here

const uri =
    "mongodb+srv://My-Dashboard:xGp9HMPuuS7qL733@cluster0.8cqdw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
async function run() {
    try {
        await client.connect();
        const database = client.db("The-Dashboard");
        const dataCollections = database.collection("Dashboard-Collection");

        //GET method for api...
        // console.log("i am from mongodb");

        app.get("/dashboard", async (req, res) => {
            const user = dataCollections.find({});
            const allData = await user.toArray();
            res.send(allData);
        });
    } finally {
        //await client.close();
    }
}
run().catch(console.dir);

// all api start from here

app.listen(port, (req, res) => {
    console.log("i am from node/express", port);
});
