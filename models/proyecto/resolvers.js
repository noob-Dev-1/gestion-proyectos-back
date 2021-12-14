import { ProjectModel } from './proyecto.js';
import { UserModel } from '../usuario/usuario.js'
import { ModeloAvance } from '../avance/avance.js'
import { ModeloInscripcion } from '../inscripcion/inscripcion.js';

const resolversProyecto = {
  Proyecto: {
    lider: async (parent, args, context) => {
      const usuarioLider = await UserModel.findOne({
        _id: parent.lider.toString(),
      });
      return usuarioLider;
    },
    inscripciones: async (parent, args, context) => {
      const inscripciones = await ModeloInscripcion.find({
        proyecto: parent._id,
      });
      return inscripciones;
    },
    avances: async (parent, args, context) => {
      return await ModeloAvance.find({ creadoPor: parent.creadoPor })
      /* const avanceProyecto = await ModeloAvance.findOne({
        _id: parent.avance.toString(),
      });
      return avanceProyecto; */
    }
  },
  Inscripcion: {
    proyecto: async (parent, args, context) => {
      return await ProjectModel.findOne({ _id: parent.proyecto });
    },
    estudiante: async (parent, args, context) => {
      return await UserModel.findOne({ _id: parent.estudiante });
    },
  },
  /* Avance:{
    proyecto: async (parent, args, context) => {
      return await ProjectModel.findOne({ _id: parent.proyecto });
    },
    creadoPor: async (parent, args, context) => {
      return await UserModel.findOne({ _id: parent.creadoPor });
    },
  }, */
  Query: {
    Proyectos: async (parent, args, context) => {
      const proyectos = await ProjectModel.find()
        /* .populate([
          { path: 'lider' },
          { path: 'avances', populate: { path: 'creadoPor' } },
          { path: 'inscripciones', populate: { path: 'estudiante' } },
        ]) */;
      return proyectos;
    },

    Proyecto: async (parent, args, context) => {
      const proyecto = await ProjectModel.findOne({ _id: args._id })
       /*  .populate([
          { path: 'lider' },
          { path: 'avances', populate: { path: 'creadoPor' } },
          { path: 'inscripciones', populate: { path: 'estudiante' } },
        ]) */;
      return proyecto;
    },
  },
  Mutation: {
    crearProyecto: async (parent, args, context) => {
      const proyectoCreado = await ProjectModel.create({
        nombre: args.nombre,
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivos: args.objetivos,
      });
      return proyectoCreado;
    },

    editarProyecto: async (parent, args) => {
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(
        args._id,
        { ...args.campos },
        { new: true }
      );
      return proyectoEditado;
    },

    crearObjetivo: async (parent, args) => {
      const proyectoConObjetivo = await ProjectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $addToSet: {
            objetivos: { ...args.campos },
          },
        },
        { new: true }
      );
      return proyectoConObjetivo;
    },

    editarObjetivo: async (parent, args) => {
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $set: {
            [`objetivos.${args.indexObjetivo}.descripcion`]: args.campos.descripcion,
            [`objetivos.${args.indexObjetivo}.tipo`]: args.campos.tipo,
          },
        },
        { new: true }
      );
      return proyectoEditado;
    },

    eliminarObjetivo: async (parent, args) => {
      const proyectoObjetivo = await ProjectModel.findByIdAndUpdate(
        { _id: args.idProyecto },
        {
          $pull: {
            objetivos: {
              _id: args.idObjetivo,
            },
          },
        },
        { new: true }
      );
      return proyectoObjetivo;
    },

    eliminarProyecto: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const proyectoEliminado = await ProjectModel.findOneAndDelete({ _id: args._id });
        return proyectoEliminado;
      } else if (Object.keys(args).includes('correo')) {
        const proyectoEliminado = await ProjectModel.findOneAndDelete({ correo: args.correo });
        return proyectoEliminado;
      }
    },
  },
};

export { resolversProyecto };
