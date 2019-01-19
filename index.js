var express = require("express");
var graphqlHTTP = require("express-graphql");
var { graphql, buildSchema } = require("graphql");
// 使用 GraphQL Schema Language 创建一个 schema
/* .gqlconfig */
var schema = buildSchema(`
  type RandomDie {
    numSides: Int!,
    rollOnce:Int,
    roll(numRolls:Int!):[Int]
  }
  type Query {
    getDie(numSides: Int!): [RandomDie]
  }
`);
class andomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({ numRolls }) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}
// root 提供所有 API 入口端点相应的解析器函数
var root = {
  getDie: function({ numSides }) {
    return [new andomDie(numSides || 6)];
  }
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
