const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`
    type Documents {
        id: Int
        name: String
        type: Type
        amount: Int
    }

    enum Type {
        invoice
        offer
        other
    }

    type Query {
        documents(
            nameIs: String, 
            nameLike: String, 
            typeIn: Type, 
            amountGte: Int, 
            amountLte: Int
        ): [Documents]
    }
`;

const dataDocuments = [
  {
    id: 1,
    name: 'asdf1',
    type: "invoice",
    amount: 2
  },
  {
    id: 2,
    name: 'asdf2',
    type: "invoice",
    amount: 5
  },
  {
    id: 3,
    name: 'asdf3',
    type: "invoice",
    amount: 15
  },
  {
    id: 4,
    name: 'aap',
    type: "invoice",
    amount: 1
  },
  {
    id: 5,
    name: 'noot',
    type: "invoice",
    amount: 5
  },
  {
    id: 6,
    name: 'mies',
    type: "other",
    amount: 3
  },
  {
    id: 7,
    name: 'nog iets',
    type: "other",
    amount: 2
  },
  {
    id: 8,
    name: 'anders',
    type: "offer",
    amount: 5
  },
  {
    id: 9,
    name: 'nog een naam',
    type: "offer",
    amount: 20
  },
];

const resolvers = {
  Query: {
    documents: (parent, args, context, info) => {
      let data = dataDocuments;

      if (args.nameIs) {
        data = data.filter(d => d.name === args.nameIs);
      }
      if (args.nameLike) {
        data = data.filter(d => d.name.indexOf(args.nameLike) >= 0);
      }
      if (args.typeIn) {
        data = data.filter(d => d.type === args.typeIn);
      }
      if (args.amountGte) {
        data = data.filter(d => d.amount >= args.amountGte);
      }
      if (args.amountLte) {
        data = data.filter(d => d.amount <= args.amountLte);
      }

      return data
    }
  },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
