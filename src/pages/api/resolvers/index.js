import connectMongo from "../mongodbClient"
import PersonalData from "../models/PersonalData"

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
    }
  }
};