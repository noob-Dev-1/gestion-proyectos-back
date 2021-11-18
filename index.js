import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import conectarBD from './db/db.js';
import { tipos } from './graphql/types.js';
import { resolvers } from './graphql/resolvers.js';

dotenv.config();

const server = new ApolloServer({
  typeDefs: tipos,
  resolvers: resolvers,
});

const app = express();

app.use(express.json());

app.use(cors());
const port = process.env.PORT || 5500

app.listen({ port }, async () => {
  await conectarBD();
  await server.start();

  server.applyMiddleware({ app });
  const baseDatos = process.env.DBNAME;
  console.log('servidor Conectado a Base de datos: ' + baseDatos);
});
