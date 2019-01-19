var { buildSchema } = require("graphql");
var dataBase = {};
const messageSchema = buildSchema(`
input MessageInput {
  content:String
  author:String
}
type Message {
  id: ID!
  content: String
  author: String
}
type Query {
  getMessage(id:ID!):Message
}
type Mutation  {
  createMessage(input: MessageInput): Message
  updateMessage(id: ID!, input: MessageInput): Message
}
`);

// 如果 Message 拥有复杂字段，我们把它们放在这个对象里面。
class Message {
  constructor(id, { content, author }) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}
const MessageRoot = {
  getMessage({ id }) {
    console.log(dataBase);
    if (!dataBase[id]) {
      throw "no this id";
    }
    return new Message(id, dataBase[id]);
  },
  createMessage({ input }) {
    const id = parseInt(Math.random() * 100);
    dataBase[id] = input;
    return new Message(id, input);
  },
  updateMessage({ id }, { input }) {
    if (!dataBase[id]) {
      throw "no this id";
    }
    dataBase[id] = input;
    return new Message(id, input);
  }
};
exports.schema = messageSchema;
exports.root = MessageRoot;