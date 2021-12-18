import { gql } from 'apollo-server-express';

const tiposUsuario = gql`
  type Usuario {
    _id: ID!
    nombre: String!
    apellido: String!
    identificacion: String!
    correo: String!
    rol: Enum_Rol!
    estado: Enum_EstadoUsuario
    inscripciones: [Inscripcion]
    avancesCreados: [Avance]
    proyectosLiderados: [Proyecto]
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
  """ type Query {
    Usuarios: [Usuario]
    Usuario(
      _id: String!
      ): Usuario
  } """
  type Query{
    Usuarios(filtro: filtrosUsuarios): [Usuario]
    Usuario(_id: String!): Usuario
  }
  input filtrosUsuarios {
    _id:ID
    nombre: String
    apellido: String
    identificacion: String
    correo: String
}

input camposUsuarios {
    nombre: String
    apellido: String
    identificacion: String
    correo: String
    rol: Enum_Rol
    estado: Enum_EstadoUsuario
}


  type Mutation {
    crearUsuario(
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      rol: Enum_Rol!
      password: String!
      estado: Enum_EstadoUsuario
    ): Usuario

    editarUsuario(
      _id: String!,
      campos: camposUsuarios!
      ): Usuario

    eliminarUsuario(
      _id: String,
      correo: String
      ): Usuario
  }
`;

export { tiposUsuario };
