import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect(uri);

export default connectMongo;
