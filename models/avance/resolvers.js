import { ModeloAvance } from './avance.js';

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      const avances = await ModeloAvance.find().populate('proyecto').populate('creadoPor');
      return avances;
    },
    filtrarAvance: async (parents, args) => {
      const avanceFiltrado = await ModeloAvance.find({ proyecto: args.idProyecto })
        .populate('proyecto')
        .populate('creadoPor');
      return avanceFiltrado;
    },
  },
  Mutation: {
    crearAvance: async (parents, args) => {
      const avanceCreado = ModeloAvance.create({
        fecha: args.fecha,
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        creadoPor: args.creadoPor,
      });
      return avanceCreado;
    },
    editarAvance: async (parent, args) => {
      const avanceEditado = await ModeloAvance.findByIdAndUpdate(args._id, {
        fecha: args.fecha,
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        creadoPor: args.creadoPor,
      });
      return avanceEditado;
    },
    eliminarAvance: async (parent, args)=>{
      if (Object.keys(args).includes('_id')){
        const avanceEliminado =await ModeloAvance.findOneAndDelete({_id: args._id});
        return avanceEliminado;
      }else if(Object.keys(args).includes('correo'){
        const avanceEliminado =await ModeloAvance.findOneAndDelete({correo: args.correo});
        return avanceEliminado;      
      }
    },
  },

};

export { resolversAvance };
