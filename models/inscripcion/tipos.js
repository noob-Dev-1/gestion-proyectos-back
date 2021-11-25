import { gql } from "apollo-server-core";

const tiposInscripcion = gql`
    type Inscripcion {
        _id: ID!
        estado: Enum_EstadoInscripcion!
        fechaIngreso: Date
        fechaEgreso: Date
        proyecto: Proyecto!
        estuDiante: Usuario!
    }

    type Query {
        Inscripciones: [Inscripcion]
    }

    type Mutation {
        crearInscripcion(
            estado: Enum_EstadoInscripcion!
            proyecto: String!
            estudiante: String!
        ): Inscripcion
    }


    type Mutation{
        aprobarInscripcion(
            id: String!
        ): Inscripcion
}

`;
export { tiposInscripcion };