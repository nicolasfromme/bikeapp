import mongoose from 'mongoose';

const uri = "mongodb+srv://usernico:RcsKvY35eIt7x4xA@bikeapp.lup56au.mongodb.net/?retryWrites=true&w=majority"

const connectMongo = async () => mongoose.connect(uri);

export default connectMongo;