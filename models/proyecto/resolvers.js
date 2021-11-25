import { ProjectModel } from './proyecto.js';

const resolversProyecto = {
  Query: {
    Proyectos: async (parent, args) => {
      const proyectos = await ProjectModel.find()
        .populate({
          path: 'avances', populate: { path: 'creadoPor' },
        }).populate({ path: 'lider' }).populate({path: 'inscripciones'});
      return proyectos;
    }/* ,
    filtrarProyecto: async (parent, args)=>{
      const proyectoFiltrado= await ProjectModel.find()
    } */
  },
  Mutation: {
    crearProyecto: async (parent, args) => {
      const proyectoCreado = await ProjectModel.create({
        nombre: args.nombre,
        estado: args.estado,
        fase: args.fase,
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivos: args.objetivos,
      });
      return proyectoCreado;
    },
  },
};

export { resolversProyecto };
