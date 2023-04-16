import Bike from '../models/Bike';
import BikeStore from '../models/Bikestore';
import Customer from '../models/Customer';
import Employee from '../models/Employee';
import Order from '../models/Order';
import connectMongo from '../connectMongo';
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

export const resolvers = {
  
  Query: {
    getUsers: async () => {
      await connectMongo()
      const test = await PersonalData.create({name: "nico", email: "fasdfa"});
    },
    getUser: async (_, args) => {
        return {
          id: "fdsa165165",
          login: "username12345",
          avatar_url: "some_url"
        };
    },
    getBikeStores: async (_, args) => {
      await connectMongo();
      const bikeStores = await BikeStore.find({});
      if (!bikeStores) {
        return [];
      }
      else {
        return bikeStores;
      }
    },
    getBikeStore: async (_, args) => {
      await connectMongo();
      const bikeStore = await BikeStore.findById(args.id);
      if (!bikeStore) {
        return null;
      }
      else {
        return bikeStore;
      }
    },
    getBikes: async (_, args, parent) => {
      await connectMongo();
      const bikes = await Bike.find({});
      if (!bikes) {
        return [];
      }
      else {
        return bikes;
      }
    },
    getBike: async (_, args, parent) => {
      await connectMongo();
      const bike = await Bike.findById(args.id);
      if (!bike) {
        return null;
      }
      else {
        return bike;
      }
    },
    getCustomers: async (_, args) => {
      await connectMongo();
      const customers = await Customer.find({});
      if (!customers) {
        return [];
      }
      else {
        return customers;
      }
    },
    getCustomer: async (_, args) => {
      await connectMongo();
      const customer = await Customer.findById(args.id);
      if (!customer) {
        return null;
      }
      else {
        return customer;
      }
    },
    getEmployees: async (_, args) => {
      await connectMongo();
      const employees = await Employee.find({});
      if (!employees) {
        return [];
      }
      else {
        return employees;
      }
    },
    getEmployee: async (_, args) => {
      await connectMongo();
      const employee = await Employee.findById(args.id);
      if (!employee) {
        return null;
      }
      else {
        return employee;
      }
    },
    getEmployeesByStore: async (_, args) => {
      await connectMongo();
      const employees = await Employee.find({ storeId: args.storeId });
      if (!employees) {
        return [];
      }
      else {
        return employees;
      }
    },
    getOrders: async (_, args) => {
      await connectMongo();
      const orders = await Order.find({});
      if (!orders) {
        return [];
      }
      else {
        return orders;
      }
    },
    getOrder: async (_, args) => {
      await connectMongo();
      const order = await Order.findById(args.id);
      if (!order) {
        return null;
      }
      else {
        return order;
      }
    },
    getLoggedInUserRole: async (_, args) => {
      const rawToken = await fetch("https://dev-jflkkc726n8tokd3.us.auth0.com/oauth/token", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          "client_id":"sRYoahQDh16eiTsjmHST2kXULsg7VjTg",
          "client_secret":"8dnNMLampy5jaGT20vT45ZhzOPNo3NH3z5OxpvolzzbM43TTZAZIRIxGe0cUlZPY",
          "audience":"https://dev-jflkkc726n8tokd3.us.auth0.com/api/v2/",
          "grant_type":"client_credentials"
        })
      })
      const token = await rawToken.json()
     
      // fetch data with options

      const response = await fetch(`https://dev-jflkkc726n8tokd3.us.auth0.com/api/v2/users/${args.id}/roles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + token.access_token,
        },
      }
      
      );
      const data = await response.json();
      return {role: data[0].name};
    },

    getBikesByStore: async (_, args) => {
      await connectMongo();
      const bikes = await Bike.find({ bikeStore: args.storeId });
      if (!bikes) {
        return [];
      }
      else {
        return bikes;
      }
    },
    getOrdersByStore: async (_, args) => {
      await connectMongo();
      const orders = await Order.find({ bikeStore: args.storeId });
      if (!orders) {
        return [];
      }
      else {
        return orders;
      }
    },
    getOrdersByCustomer: async (_, args) => {
      await connectMongo();
      console.log(args.customerId)
      const orders = await Order.find({ customer: args.customerId });
      if (!orders) {
        return [];
      }
      else {
        return orders;
      }
    }
  },
  Mutation: {
    addBikeStore: async (_, args) => {
      await connectMongo();
      console.log(args.input)
      const bikeStore = new BikeStore({
        name: args.input.name,
        street: args.input.street,
        city: args.input.city,
        state: args.input.state,
        zip: args.input.zip,
        phone: args.input.phone,
        email: args.input.email,
        lat: args.input.location.lat,
        lng: args.input.location.long,
      });
      await bikeStore.save();
      console.log(args.input)
      const employee = new Employee({
        firstname: args.input.employee.firstname,
        lastname: args.input.employee.lastname,
        street: args.input.employee.street,
        city: args.input.employee.city,
        state: args.input.employee.state,
        zip: args.input.employee.zip,
        phone: args.input.employee.phone,
        email: args.input.employee.email,
        position: args.input.employee.position,
        storeId: bikeStore._id,
        storeName: bikeStore.name
      });
      await employee.save();

      return bikeStore;
    },
    addBike: async (_, args) => {
      await connectMongo();
      const bike = new Bike({
        type: args.input.type,
        brand: args.input.brand,
        model: args.input.model,
        year: args.input.year,
        color: args.input.color,
        price: args.input.price,
        description: args.input.description,
        bikeStore: args.input.bikeStore
      });
      await bike.save();
      return bike;
    },
    addCustomer: async (_, args) => {
      await connectMongo();
      const customer = new Customer({
        firstname: args.input.firstname,
        lastname: args.input.lastname,
        street: args.input.street,
        city: args.input.city,
        state: args.input.state,
        zip: args.input.zip,
        phone: args.input.phone,
        email: args.input.email,
      });
      await customer.save();
      return customer;
    },
    addEmployee: async (_, args) => {
      await connectMongo();
      const employee = new Employee({
        firstname: args.input.firstname,
        lastname: args.input.lastname,
        street: args.input.street,
        city: args.input.city,
        state: args.input.state,
        zip: args.input.zip,
        phone: args.input.phone,
        email: args.input.email,
        position: args.input.position,
        store: args.input.store,
        storeId: args.input.storeId
      });
      await employee.save();
      return employee;
    },
    setBikeRented: async (_, args) => {
      await connectMongo();
      const bike = await Bike.findById(args.input.id);
      bike.rented = true;
      await bike.save();
      return bike;
    },
    setBikeLocation: async (_, args) => {
      await connectMongo();
      const bike = await Bike.findById(args.input.id);
      bike.bikeStore = args.input.input.bikeStore;
      await bike.save();
      return bike;
    },
    
    addOrder: async (_, args) => {
      await connectMongo();
      console.log("Add Order")
      console.log(args)
      const bikeId = args.input.bike;
      if (!mongoose.Types.ObjectId.isValid(bikeId)) {
        throw new Error(`Invalid bike ID: ${bikeId}`);
      }
      const order = new Order({
        customer: new ObjectId(args.input.customer),
        bike: args.input.bikeModel,
        date: args.input.date,
        price: args.input.price,
      });
      await order.save();
      // // Convert
      return order;
    }
  }
};