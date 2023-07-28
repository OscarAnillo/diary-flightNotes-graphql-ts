import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import fs from 'fs';
import path from 'path';

import { getAllEntries, findById, addEntry } from './services/diaryServices'

const resolvers = {
    Query: {
        ping: () => "Pong",
        diaries: async () => getAllEntries(),
        findById: async (root: any, args: any) => findById(args.id)
    },
    Mutation: {
        addEntry: (root: any, args: any) => addEntry({ ...args })
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "Graphql/schema.graphql"), "utf-8"),
    resolvers
});

startStandaloneServer(server, {
    listen: {
        port: 3006
    }
}).then((res) => console.log(`Server running on port ${res.url}`))