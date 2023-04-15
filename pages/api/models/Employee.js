import { Schema, model, models } from 'mongoose';

const EmployeeSchema = new Schema({
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
    store: {
        type: Schema.Types.ObjectId,
        ref: 'BikeStore',
    },
});

const Employee = models.Employee || model('Employee', EmployeeSchema);

export default Employee;