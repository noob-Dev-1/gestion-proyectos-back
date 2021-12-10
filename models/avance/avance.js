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
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  }, */
},
);
avanceSchema.virtual('proyecto', {
  ref: 'Proyecto',
  localField: '_id',
  foreignField: 'proyecto',
});

avanceSchema.virtual('estudiante', {
  ref: 'Usuario',
  localField: '_id',
  foreignField: 'estudiante',
});

const ModeloAvance = model('Avance', avanceSchema, 'Avances');

export { ModeloAvance };
