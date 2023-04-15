import { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    bike: {
        type: String,
        ref: 'Bike',
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
});

const Order = models.Order || model('Order', OrderSchema);
export default Order;