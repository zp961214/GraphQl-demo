var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema, GraphQLString, GraphQLObjectType, GraphQLSchema } = require("graphql");
var app = express();
// 使用 GraphQL Schema Language 创建一个 schema
/* .gqlconfig */

app.use(
  "/graphql",
  graphqlHTTP({
    schema: require("./test1").schema,
    rootValue: require("./test1").root,
    graphiql: true
  })
);

app.use(
  "/message",
  graphqlHTTP({
    schema: require("./test2").schema,
    rootValue: require("./test2").root,
    graphiql: true
  })
);
var fakeDatabase = {
  a: {
    id: "a",
    name: "alice"
  },
  b: {
    id: "b",
    name: "bob"
  }
};
var userType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});
var queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: userType,
      // `args` 描述了 `user` 查询接受的参数
      args: {
        id: { type: GraphQLString }
      },
      resolve: function(_,{ id }) {
        return fakeDatabase[id];
      }
    }
  }
});
var schemas = new GraphQLSchema({ query: queryType });
app.use(
  "/User",
  graphqlHTTP({
    schema: schemas,
    graphiql: true
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
