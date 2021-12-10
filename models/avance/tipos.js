import { gql } from 'apollo-server-express';

const tiposAvance = gql`
  type Avance {
    _id: ID!
    fecha: Date!
    descripcion: String!
    observaciones: [String]
    proyecto(idProyecto: String!): Proyecto
    creadoPor: Usuario
  }
  type Proyecto{
    _id: ID
    nombre: String
    presupuesto: Float
    fechaInicio: Date
    fechaFin: Date
    estado: Enum_EstadoProyecto
    fase: Enum_FaseProyecto
    lider: Usuario
}

  type Query {
    Avances(idProyecto: String!): [Avance]
    filtrarAvance(idProyecto: String!): [Avance]
  }
  type Mutation {
    crearAvance( descripcion: String!, observaciones: [String], proyecto: String!, creadoPor: String!): Avance
  }
  type Mutation {
    editarAvance(_id: String!, descripcion: String!,): Avance
  }
  type Mutation {
    eliminarAvance(_id: String! fecha: Date!, descripcion: String!): Avance
  }
`;

export { tiposAvance };
