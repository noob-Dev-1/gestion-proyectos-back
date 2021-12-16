import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import conectarBD from './db/db.js';
import { tipos } from './graphql/types.js';
import { resolvers } from './graphql/resolvers.js';
import { validateToken} from './utilidades/tokenUtils.js'

dotenv.config();

const getUserData = (token) => {
  const verificacion = validateToken(token.split(' ')[1]);
  if (verificacion.data) {
    return verificacion.data;
  } else {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs: tipos,
  resolvers: resolvers,
  context: ({ req, res }) => {
    const token = req.headers?.authorization ?? null;
    if (token) {
      const userData = getUserData(token);
      console.log('user data', userData)
      if (userData) {
        return { userData };
      }
    }
    return null;
  },
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
  console.log('Servidor Conectado a Base de datos: ' + baseDatos);
});
