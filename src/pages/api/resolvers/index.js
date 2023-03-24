import Bike from '../models/Bike';
import BikeStore from '../models/BikeStore';
import Customer from '../models/Customer';
import Employee from '../models/Employee';
import Order from '../models/Order';
import connectMongo from '../connectMongo';

export const resolvers = {
  Query: {
    getUsers: async () => {
        const users = [
            {
              "login": "mojombo",
              "id": 1,
              "node_id": "MDQ6VXNlcjE=",
              "avatar_url": "https://avatars.githubusercontent.com/u/1?v=4",
              "gravatar_id": "",
              "url": "https://api.github.com/users/mojombo",
              "html_url": "https://github.com/mojombo",
              "followers_url": "https://api.github.com/users/mojombo/followers",
              "following_url": "https://api.github.com/users/mojombo/following{/other_user}",
              "gists_url": "https://api.github.com/users/mojombo/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/mojombo/subscriptions",
              "organizations_url": "https://api.github.com/users/mojombo/orgs",
              "repos_url": "https://api.github.com/users/mojombo/repos",
              "events_url": "https://api.github.com/users/mojombo/events{/privacy}",
              "received_events_url": "https://api.github.com/users/mojombo/received_events",
              "type": "User",
              "site_admin": false
            },
            {
              "login": "defunkt",
              "id": 2,
              "node_id": "MDQ6VXNlcjI=",
              "avatar_url": "https://avatars.githubusercontent.com/u/2?v=4",
              "gravatar_id": "",
              "url": "https://api.github.com/users/defunkt",
              "html_url": "https://github.com/defunkt",
              "followers_url": "https://api.github.com/users/defunkt/followers",
              "following_url": "https://api.github.com/users/defunkt/following{/other_user}",
              "gists_url": "https://api.github.com/users/defunkt/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/defunkt/subscriptions",
              "organizations_url": "https://api.github.com/users/defunkt/orgs",
              "repos_url": "https://api.github.com/users/defunkt/repos",
              "events_url": "https://api.github.com/users/defunkt/events{/privacy}",
              "received_events_url": "https://api.github.com/users/defunkt/received_events",
              "type": "User",
              "site_admin": false
            },
            {
              "login": "pjhyett",
              "id": 3,
              "node_id": "MDQ6VXNlcjM=",
              "avatar_url": "https://avatars.githubusercontent.com/u/3?v=4",
              "gravatar_id": "",
              "url": "https://api.github.com/users/pjhyett",
              "html_url": "https://github.com/pjhyett",
              "followers_url": "https://api.github.com/users/pjhyett/followers",
              "following_url": "https://api.github.com/users/pjhyett/following{/other_user}",
              "gists_url": "https://api.github.com/users/pjhyett/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/pjhyett/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/pjhyett/subscriptions",
              "organizations_url": "https://api.github.com/users/pjhyett/orgs",
              "repos_url": "https://api.github.com/users/pjhyett/repos",
              "events_url": "https://api.github.com/users/pjhyett/events{/privacy}",
              "received_events_url": "https://api.github.com/users/pjhyett/received_events",
              "type": "User",
              "site_admin": false
            },
            {
              "login": "wycats",
              "id": 4,
              "node_id": "MDQ6VXNlcjQ=",
              "avatar_url": "https://avatars.githubusercontent.com/u/4?v=4",
              "gravatar_id": "",
              "url": "https://api.github.com/users/wycats",
              "html_url": "https://github.com/wycats",
              "followers_url": "https://api.github.com/users/wycats/followers",
              "following_url": "https://api.github.com/users/wycats/following{/other_user}",
              "gists_url": "https://api.github.com/users/wycats/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/wycats/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/wycats/subscriptions",
              "organizations_url": "https://api.github.com/users/wycats/orgs",
              "repos_url": "https://api.github.com/users/wycats/repos",
              "events_url": "https://api.github.com/users/wycats/events{/privacy}",
              "received_events_url": "https://api.github.com/users/wycats/received_events",
              "type": "User",
              "site_admin": false
            },
            {
              "login": "ezmobius",
              "id": 5,
              "node_id": "MDQ6VXNlcjU=",
              "avatar_url": "https://avatars.githubusercontent.com/u/5?v=4",
              "gravatar_id": "",
              "url": "https://api.github.com/users/ezmobius",
              "html_url": "https://github.com/ezmobius",
              "followers_url": "https://api.github.com/users/ezmobius/followers",
              "following_url": "https://api.github.com/users/ezmobius/following{/other_user}",
              "gists_url": "https://api.github.com/users/ezmobius/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/ezmobius/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/ezmobius/subscriptions",
              "organizations_url": "https://api.github.com/users/ezmobius/orgs",
              "repos_url": "https://api.github.com/users/ezmobius/repos",
              "events_url": "https://api.github.com/users/ezmobius/events{/privacy}",
              "received_events_url": "https://api.github.com/users/ezmobius/received_events",
              "type": "User",
              "site_admin": false
            },
            {
              "login": "ivey",
              "id": 6,
              "node_id": "MDQ6VXNlcjY=",
              "avatar_url": "https://avatars.githubusercontent.com/u/6?v=4",
              "gravatar_id": "",
              "url": "https://api.github.com/users/ivey",
              "html_url": "https://github.com/ivey",
              "followers_url": "https://api.github.com/users/ivey/followers",
              "following_url": "https://api.github.com/users/ivey/following{/other_user}",
              "gists_url": "https://api.github.com/users/ivey/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/ivey/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/ivey/subscriptions",
              "organizations_url": "https://api.github.com/users/ivey/orgs",
              "repos_url": "https://api.github.com/users/ivey/repos",
              "events_url": "https://api.github.com/users/ivey/events{/privacy}",
              "received_events_url": "https://api.github.com/users/ivey/received_events",
              "type": "User",
              "site_admin": false
            }]
        return users.map(({ id, login, avatar_url }) => ({
          id,
          login,
          avatar_url
        }));
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
    getBikes: async (_, args) => {
      await connectMongo();
      const bikes = await Bike.find({});
      if (!bikes) {
        return [];
      }
      else {
        return bikes;
      }
    },
    getBike: async (_, args) => {
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
      if (!costumers) {
        return [];
      }
      else {
        return costumers;
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
    }
  },
  Mutation: {
    addBikeStore: async (_, args) => {
      await connectMongo();
      console.log(args.input.name)
      const bikeStore = new BikeStore({
        name: args.input.name,
        street: args.input.street,
        city: args.input.city,
        state: args.input.state,
        zip: args.input.zip,
        phone: args.input.phone,
        email: args.input.email,
      });
      await bikeStore.save();
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
      console.log(args)
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
        store: args.input.store
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
      const order = new Order({
        bike: args.input.bike,
        customer: args.input.customer,
        employee: args.input.employee,
        date: args.input.date,
        price: args.input.price,
        status: args.input.status,
      });
      await order.save();
      return order;
    }
  }
};