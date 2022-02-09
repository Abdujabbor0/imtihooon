const { makeExecutableSchema } =require('@graphql-tools/schema')

const type = require('./type')
const UserModule = require('./user')
const categories = require('./categories')
const products = require('./products')
const orders = require('./orders')
// const { resolvers } = require('./user')
// const { typeDefs } = require('./user')

module.exports = makeExecutableSchema({
    typeDefs: [
        type.typeDefs,
        UserModule.typeDefs,
        categories.typeDefs,
        products.typeDefs,
        orders.typeDefs
    ],
    resolvers: [
        type.resolvers,
        UserModule.resolvers,
        categories.resolvers,
        products.resolvers,
        orders.resolvers
    ]
})