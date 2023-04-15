import { Schema, model, models } from 'mongoose';

const CustomerSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
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
    rentals: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Bike',
        },
    ],
});

const Customer = models.Customer || model('Customer', CustomerSchema);
export default Customer;
