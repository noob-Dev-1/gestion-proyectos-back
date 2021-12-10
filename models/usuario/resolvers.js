import { ModeloInscripcion } from '../inscripcion/inscripcion.js';
import { UserModel } from './usuario.js';
import { ProjectModel } from '../proyecto/proyecto.js';
import { ModeloAvance } from '../avance/avance.js';
import bcrypt from 'bcrypt';

const resolversUsuario = {
  Usuario: {
    inscripciones: async (parent, args, context) => {
      return ModeloInscripcion.find({ estudiante: parent._id });
    },
    avancesCreados: async (parent, args, context) => {
      return ModeloAvance.find({ creadoPor: parent.creadoPor })
    },
    proyectosLiderados: async (parent, args, context) =>{
      return ProjectModel.find({proyecto: parent.lider})
    }
  },

  /*   Query: {
      Usuarios: async (parent, args, context) => {
        const usuarios = await UserModel.find()
          .populate([
            { path: 'inscripciones', populate: { path: '_id' } },
            { path: 'avancesCreados', populate: { path: '_id' } },
            { path: 'proyectosLiderados', populate: { path: '_id' } },
          ]);
        return usuarios;
      },
  
      Usuario: async (parent, args) => {
        const usuario = await UserModel.findOne({ _id: args._id })
          .populate([
            { path: 'inscripciones', populate: { path: '_id' } },
            { path: 'avancesCreados', populate: { path: '_id' } },
            { path: 'proyectosLiderados', populate: { path: '_id' } },
          ]);
        return usuario;
      },
    }, */
  Query: {
    Usuarios: async (parent, args, context) => {
      console.log(args);
      const usuarios = await UserModel.find({ ...args.filtro });
      return usuarios;
    },
    Usuario: async (parent, args) => {
      const usuario = await UserModel.findOne({ _id: args._id });
      return usuario;
    },
  },
  Mutation: {
    crearUsuario: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const usuarioCreado = await UserModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        password: hashedPassword,
      });

      if (Object.keys(args).includes('estado')) {
        usuarioCreado.estado = args.estado;
      }

      return usuarioCreado;
    },
    editarUsuario: async (parent, args) => {
      const usuarioEditado = await UserModel.findByIdAndUpdate(args._id, 
        {
        /* nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        estado: args.estado, */
        ...args.campos },
       { new: true });

      return usuarioEditado;
    },
    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const usuarioEliminado = await UserModel.findOneAndDelete({ _id: args._id });
        return usuarioEliminado;
      } else if (Object.keys(args).includes('correo')) {
        const usuarioEliminado = await UserModel.findOneAndDelete({ correo: args.correo });
        return usuarioEliminado;
      }
    },
  },
};

export { resolversUsuario };
