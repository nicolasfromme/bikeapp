import { Schema, model, models } from 'mongoose';

const BikeStoreSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    employees: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
        },
    ],
    locationLat: {
        type: Number,
        required: true,
    },
    locationLong: {
        type: Number,
        required: true,
    },
    bikes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Bike',
        },
    ],
});

const BikeStore = models.BikeStore || model('BikeStore', BikeStoreSchema);
export default BikeStore;