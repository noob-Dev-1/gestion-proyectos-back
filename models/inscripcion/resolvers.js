import { ModeloInscripcion } from './inscripcion.js'
import { ProjectModel } from '../proyecto/proyecto.js';
import { UserModel } from '../usuario/usuario.js';

const resolversInscripcion = {

    Inscripcion: {
        proyecto: async (parent, args, context) => {
            return await ProjectModel.findOne({ inscripcion: parent._id });
        },
        estudiante: async (parent, args, context) => {
            return await UserModel.findOne({ usuario: parent.estudiante });
        },
    },
    Query: {
        Inscripciones: async (parent, args, context) => {
            let filtro = {};
            if (context.userData) {
                console.log(userData)
                if (context.userData.rol === 'LIDER') {
                    const projects = await ProjectModel.find({ lider: context.userData._id });
                    const projectList = projects.map((p) => p._id.toString());
                    filtro = {
                        proyecto: {
                            $in: projectList,
                        },
                    };
                } else {
                    console.error("Error mostrando las inscripciones")
                }
            }
            const inscripciones = await ModeloInscripcion.find({ /* ... filtro  */ });
            return inscripciones;
        },
        InscripcionesProyecto: async (parent, args, context) => {
            return await ModeloInscripcion.find();
        }
    },

    Mutation: {
        crearInscripcion: async (parent, args) => {
            const inscripcionCreada = await ModeloInscripcion.create({
                proyecto: args.proyecto,
                estudiante: args.estudiante
            });
            return inscripcionCreada;
        },
        aprobarInscripcion: async (parent, args) => {
            const inscripcionAprobada = await ModeloInscripcion.findByIdAndUpdate(args._id,
                { ...args.campos },
                { new: true }
            );
            return inscripcionAprobada;
        },
    },

};

export { resolversInscripcion }