import { gql } from "apollo-server-micro"; 

export const typeDefs = gql`
    # returns mock data to test api connection
    type User {
        id: ID
        login: String
        avatar_url: String
    }
    type BikeStore {
        id: ID
        name: String
        street: String
        city: String
        state: String
        zip: Int
        phone: Int
        email: String
        bikes: [Bike]
    }

    type Bike {
        id: ID
        type: String
        brand: String
        model: String
        year: Int
        color: String
        price: String
        description: String
        rented: Boolean
        bikeStore: BikeStore
    }

    type Customer {
        id: ID
        firstname: String
        lastname: String
        email: String
        phone: Int
        street: String
        city: String
        state: String
        zip: Int
        rentals: [Bike]
    }

    type employee {
        id: ID
        firstname: String
        lastname: String
        email: String
        phone: Int
        street: String
        city: String
        state: String
        zip: Int
        store: BikeStore
        position: String
    }
    
    type Order {
        id: ID
        customer: Customer
        bike: Bike
        date: String
        price: String
    }

    input BikeStoreInput {
        name: String!
        street: String!
        city: String!
        state: String!
        zip: Int!
        phone: Int!
        email: String!
    }

    input BikeInput {
        type: String!
        brand: String!
        model: String!
        year: Int!
        color: String!
        price: Int!
        description: String!
        rented: Boolean!
        bikeStore: ID!
    }

    input CustomerInput {
        firstname: String!
        lastname: String!
        email: String!
        phone: Int!
        street: String!
        city: String!
        state: String!
        zip: Int!
    }

    input employeeInput {
        firstname: String!
        email: String!
        phone: Int!
        street: String!
        city: String!
        state: String!
        zip: Int!
        store: ID!
        position: String!
        lastname: String!
    }

    input bikeRentedInput {
        id: ID!
        rented: Boolean!
    }

    input bikeLocationInput {
        id: ID!
        bikeStore: ID!
    }

    input OrderInput {
        customer: ID!
        bike: ID!
        date: String!
        price: Int!
    }
    
    type Mutation {
        addBikeStore(
            input: BikeStoreInput!
        ): BikeStore
                    
        addBike(
            input: BikeInput!
        ): Bike
    
        addCustomer(
            input: CustomerInput!
        ): Customer

        addEmployee(
            input: employeeInput!
        ): employee

        setBikeRented(
            input: bikeRentedInput!
        ): Bike

        setBikeLocation(
            input: bikeLocationInput!
        ): Bike

        addOrder(
            input: OrderInput!
        ): Order
    }

    type Query {
        getUsers: [User]
        getUser(name: String!): User!
        getBikeStores: [BikeStore]
        getBikeStore(name: String!): BikeStore!
        getBikes: [Bike]
        getBike(id: ID!): Bike!
        getCustomers: [Customer]
        getCustomer(id: ID!): Customer!
        getEmployees: [employee]
        getEmployee(id: ID!): employee!
        getEmpoyeesByStore(storeId: ID!): [employee]
        getOrders: [Order]
        getOrder(id: ID!): Order!
    }`