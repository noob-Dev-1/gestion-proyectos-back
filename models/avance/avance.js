import mongoose from 'mongoose';
import { ProjectModel } from '../proyecto/proyecto.js';
import { UserModel } from '../usuario/usuario.js';

const { Schema, model } = mongoose;

const avanceSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  observaciones: [
    {
      type: String,
    },
  ],
  /* proyecto: {
    type: Schema.Types.ObjectId,
    ref: ProjectModel,
    required: true,
  }, */
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
avanceSchema.virtual('proyectos', {
  ref: 'Proyecto',
  localField: '_id',
  foreignField: 'avances',
});



const ModeloAvance = model('Avance', avanceSchema, 'Avances');

export { ModeloAvance };
