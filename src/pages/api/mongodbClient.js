import { MongoClient } from 'mongodb'

const uri = "mongodb+srv://usernico:RcsKvY35eIt7x4xA@bikeapp.lup56au.mongodb.net/?retryWrites=true&w=majority"
import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect(uri);

export default connectMongo;
/*
const uri = "mongodb://usernico:RcsKvY35eIt7x4xA@ac-xtosa3a-shard-00-00.lup56au.mongodb.net:27017,ac-xtosa3a-shard-00-01.lup56au.mongodb.net:27017,ac-xtosa3a-shard-00-02.lup56au.mongodb.net:27017/?ssl=true&replicaSet=atlas-q5k1to-shard-0&authSource=admin&retryWrites=true&w=majority"
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {

  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise


/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://usernico:RcsKvY35eIt7x4xA@bikeapp.lup56au.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export default client;
/*
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/
