import { gql } from 'apollo-server-express';

const tiposAvance = gql`
  type Avance {
    _id: ID!
    fecha: Date!
    descripcion: String!
    observaciones: [String]
    proyecto: Proyecto!
    creadoPor: Usuario!
  }


  type Query {
    Avances: [Avance]
    filtrarAvance(idProyecto: String!): [Avance]
  }
  type Mutation {
    crearAvance(fecha: Date!, descripcion: String!, observaciones: [String], proyecto: String!, creadoPor: String!): Avance
  }
  type Mutation {
    editarAvance(_id: String! fecha: Date!, descripcion: [String!],observaciones: [String], proyecto: String!, creadoPor: String!): Avance
  }
  type Mutation {
    eliminarAvance(_id: String! fecha: Date!, descripcion: String!): Avance
  }
`;

export { tiposAvance };
