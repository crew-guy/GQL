import {GraphQLServer, PubSub} from 'graphql-yoga'
import db from './db'
import Mutation from './resolvers/Mutation'
import Query from "./resolvers/Query"
import User from "./resolvers/User"
import Prod from './resolvers/Prod'
import Comment from './resolvers/Comment'
import Review from './resolvers/Review'
import Subscription from './resolvers/Subscription'
import './prisma'

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        User,
        Prod,
        Review,
        Comment,
        Subscription
    },
    context : {
        db,
        pubsub
    }
})

server.start(()=>console.log('Taaza khaana ready hai!'))