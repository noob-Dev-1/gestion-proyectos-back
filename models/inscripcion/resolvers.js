import { ModeloInscripcion } from './inscripcion.js'

const resolversInscripcion = {
    Query: {
        Inscripciones: async (parent, args) => {
            const inscripciones = await ModeloInscripcion.find();
            return inscripciones;
        },
    },
    Mutation: {
        crearInscripcion: async (parent, args) => {
            const inscripcionCreada = await ModeloInscripcion.create({
                estado: args.estado,
                proyecto: args.proyecto,
                estudiante: args.estudiante
            });
            return inscripcionCreada;
        },
        aprobarInscripcion: async (parent, args) => {
            const inscripcionAprobada = await ModeloInscripcion.findByIdAndUpdate(args._id, {
                estado: 'ACEPTADO',
                fechaIngreso: Date.now(),
            },
                { new: true }
            );
            return inscripcionAprobada;
        },
    },

};

export { resolversInscripcion }