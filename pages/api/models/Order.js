import { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
    bike: {
        type: Schema.Types.ObjectId,
        ref: 'Bike',
        required: true,
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    date: {
        type: String,
        required: true,	
    },
    price: {
        type: String,
        required: true,
    },
    bikeStore: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: false,
    },
});

const Order = models.Order || model('Order', OrderSchema);
export default Order;