import { Schema, model, models } from 'mongoose';

const BikeSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rented: {
        type: Boolean,
        required: true,
        default: false,
    },
    bikeStore: {
        type: Schema.Types.ObjectId,
        ref: 'BikeStore',
    },
});

const Bike = models.Bike || model('Bike', BikeSchema);
export default Bike;