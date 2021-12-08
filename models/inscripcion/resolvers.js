import { ModeloInscripcion } from './inscripcion.js'
import { ProjectModel } from '../proyecto/proyecto.js';
import { UserModel } from '../usuario/usuario.js';

const resolversInscripcion = {
    Inscripcion: {
        proyecto: async (parent, args, context) => {
            return await ProjectModel.findOne({ _id: parent.proyecto });
        },
        estudiante: async (parent, args, context) => {
            return await UserModel.findOne({ _id: parent.estudiante });
        },
    },
    Query: {
        Inscripciones: async (parent, args, context) => {
            const inscripciones = await InscriptionModel.find();
            let filtro = {};
            if (context.userData) {
                if (context.userData.rol === 'LIDER') {
                    const projects = await ProjectModel.find({ lider: context.userData._id });
                    const projectList = projects.map((p) => p._id.toString());
                    filtro = {
                        proyecto: {
                            $in: projectList,
                        },
                    };
                }
            }
            const inscripcionesDeProyectos = await InscriptionModel.find({ ...filtro });
            return inscripcionesDeProyectos;   
        },
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
            const inscripcionAprobada = await ModeloInscripcion.findByIdAndUpdate(args._id, {
                estado: 'ACEPTADA',
                fechaIngreso: Date.now().toISOString().split("T")[0],
            },
                { new: true }
            );
            return inscripcionAprobada;
        },
    },

};

export { resolversInscripcion }