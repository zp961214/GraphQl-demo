var { buildSchema } = require("graphql");
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
class RandomDie {
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
    return [new RandomDie(numSides || 6)];
  }
};
exports.schema = schema;
exports.root = root;

