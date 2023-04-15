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
        zip: String
        phone: String
        email: String
        bikes: [Bike]
        lat: String
        lng: String
        employees: [employee]
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
        bikeStore: String
        pricetag: String
        imageURL: String
    }

    type Customer {
        id: ID
        firstname: String
        lastname: String
        email: String
        phone: String
        street: String
        city: String
        state: String
        zip: String
        rentals: [Bike]
    }

    type employee {
        id: ID
        firstname: String
        lastname: String
        email: String
        phone: String
        street: String
        city: String
        state: String
        zip: String
        store: BikeStore
        position: String
    }
    
    type Order {
        id: ID!
        customer: ID!
        bike: String
        bikeModel: String
        date: String!
        price: String!
    }

    type loggedInUserRole {
        role: String
    }

    type Location {
        id: ID
        long: String
        lat: String
    }

    input LocationInput {
        long: String!
        lat: String!
    }

    input BikeStoreInput {
        name: String!
        street: String!
        city: String!
        state: String!
        zip: String!
        phone: String!
        email: String!
        location: LocationInput!
        employee: employeeInput!
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
        pricetag: String
        imageURL: String
    }

    input CustomerInput {
        firstname: String!
        lastname: String!
        email: String!
        phone: String!
        street: String!
        city: String!
        state: String!
        zip: String!
    }

    input employeeInput {
        firstname: String!
        email: String!
        phone: String!
        street: String!
        city: String!
        state: String!
        zip: String!
        storeId: ID
        storeName: String
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
        bikeModel: String!
        date: String!
        price: String!
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
        getEmployeesByStore(storeId: ID!): [employee]
        getOrders: [Order]
        getOrder(id: ID!): Order!
        getLoggedInUserRole(id: String!): loggedInUserRole!

        getBikesByStore(storeId: ID!): [Bike]
        getOrdersByStore(storeId: ID!): [Order]
        getOrdersByCustomer(customerId: String!): [Order]
    }`