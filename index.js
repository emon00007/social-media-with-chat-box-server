require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const port =process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x8jkuyh.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const postCollection = client.db("socialmediya").collection("PostCollection")

    app.get('/PostCollection',async(req,res)=>{
        const result = await postCollection.find().toArray();
        res.send(result);
    })

    app.post('/PostCollection', async (req, res) => {
      const item = req.body;
      console.log(item);
      const result = await postCollection.insertOne(item);
      res.send(result);
  });
  //   app.post('/PostCollection', async (req, res) => {
  //     const item = req.body;
  //     console.log(item);
  //     const result = await postCollection.insertOne(item);
  //     res.send(result);
  // });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('social media connected')
})
app.listen(port,()=>{
    console.log(`social-media connected success ${port}`)
})