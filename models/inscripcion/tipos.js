import { gql } from "apollo-server-express";

const tiposInscripcion = gql`
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

    type Inscripcion {
        _id: ID!
        estado: Enum_EstadoInscripcion!
        fechaIngreso: Date
        fechaEgreso: Date
        proyecto(lider:String): Proyecto
        estudiante: Usuario
    }

    type Query {
        Inscripciones (idEstudiante: String!): [Inscripcion]
        InscripcionesNoContext: [Inscripcion]
    }

    """ type Mutation {
        crearInscripcion(
            estado: Enum_EstadoInscripcion!
            proyecto: String!
            estudiante: String!
        ): Inscripcion
    } """

    type Mutation {
    crearInscripcion(proyecto: String!, estudiante: String!): Inscripcion

    aprobarInscripcion(id: String!): Inscripcion
    }

`;
export { tiposInscripcion };