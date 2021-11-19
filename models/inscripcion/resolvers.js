

const resolverInscripciones = {
    Query: {
        Inscripciones: async (parent, args) => {
            const inscripciones = await ModeloInscripcion.find();
            return inscripciones;
        },
    },
    Mutation: {
        crearInscripcion: async (parent, args) => {
            const insripcionCreada = await ModeloInscripcion.create({
                estado: args.estado,
                proyecto: args.proyecto,
                estudiante: args.estudiante
            });
            return insripcionCreada;
        },
    },
    Mutation: {
        aprobarInscripcion: async (parent, args) => {
            const inscripcionAprobada = await ModeloInscripcion.findByIdAndUpdate(args.id, {
                estado: 'ACEPTADO',
                fechaIngreso: Date.now(),
            });
            return inscripcionAprobada;
        },
    },
};

export { resolverInscripciones }