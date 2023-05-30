const express = require("express")
const { graphqlHTTP } = require("express-graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema } = require("graphql");

const app = express();
const port = 8080;

const website = [
    {
        id: 1,
        name: "Google",
        url: "https://www.google.com/"
    },
    {
        id: 2,
        name: "Facebook",
        url: "https://www.facebook.com/"
    },
    {
        id: 3,
        name: "Twitter",
        url: "https://www.twitter.com/"
    },
    {
        id: 4,
        name: "Instagram",
        url: "https://www.instagram.com/"
    }
];

const fruits = [
    {
        id: 1,
        name: "Apple",
        url: "https://www.apple.com/"
    },
    {
        id: 2,
        name: "Orange",
        url: "https://www.orange.com/"
    },
    {
        id: 3,
        name: "Banana",
        url: "https://www.banana.com/"
    },
    {
        id: 4,
        name: "Grape",
        url: "https://www.grape.com/"
    }
];

const websiteType = new GraphQLObjectType({
    name: "website",
    description: "This represents a website object",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        url: { type: GraphQLString }
    })
})

const fruitsType = new GraphQLObjectType({
    name: "fruits",
    description: "This represents a fruits object",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        url: { type: GraphQLString }
    })
})

// Declare the object of the root object
const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        website: {
            type: new GraphQLList(websiteType),
            description: "List of all websites",
            resolve: () => website
        },
        fruits: {
            type: new GraphQLList(fruitsType),
            description: "List of all fruits",
            resolve: () => fruits
        }
    })
})

// Declare the schema root object
const schema = new GraphQLSchema({
    query: RootQueryType
})


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});