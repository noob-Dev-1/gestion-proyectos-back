import { ModeloAvance } from './avance.js';
import { ProjectModel } from '../proyecto/proyecto.js'
import { UserModel } from '../usuario/usuario.js'


const resolversAvance = {
  Avance: {
    proyecto: async (parent, args, context) => {
      return await ProjectModel.findOne({ avance: parent.proyecto });
    },
    creadoPor: async (parent, args, context) => {
      return await UserModel.findOne({ usuario: parent._id })
    }
  },

  Query: {
    Avances: async (parent, args) => {
      const avances = await ModeloAvance.find()
        /* .populate(
          { path: 'proyecto' }
        )
        .populate('creadoPor') */;
      return avances;
    },
    filtrarAvance: async (parents, args) => {
      const avanceFiltrado = await ModeloAvance.find();
      return avanceFiltrado;
    },
  },
  Mutation: {
    crearAvance: async (parents, args) => {
      const avanceCreado = ModeloAvance.create({
        fecha: args.fecha,
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        observaciones: args.observaciones,
        creadoPor: args.creadoPor,
      });
      return avanceCreado;
    },
    editarAvance: async (parent, args) => {
      const avanceEditado = await ModeloAvance.findByIdAndUpdate(args._id, 
        {descripcion: args.descripcion}, 
        { new: true });
      return avanceEditado;
    },
    eliminarAvance: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const avanceEliminado = await ModeloAvance.findOneAndDelete({ _id: args._id });
        return avanceEliminado;
      } else if (Object.keys(args).includes('correo')) {
        const avanceEliminado = await ModeloAvance.findOneAndDelete({ correo: args.correo });
        return avanceEliminado;
      }
    },
  },

};

export { resolversAvance };
