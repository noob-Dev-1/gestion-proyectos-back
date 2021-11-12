import { Schema, model } from 'mongoose';
import { Enum_Estado_Inscripcion } from './enums';
import { User } from './user'

interface Inscripcion {
  identificador: string;
  estudiante: User;
  estadoInscripcion: Enum_Estado_Inscripcion;
  fechaIngreso:Date;
}

const inscripcionSchema = new Schema<Inscripcion>({
  identificador: {
    type: String,
    required: true,
    unique: true,
  },

  estudiante: {
    type: String,
    required: true,
  },

  fechaIngreso: {
    type: Date,
    required: true,
  },

  estadoInscripcion: {
    type: String,
    required: true,
    enum: Enum_Estado_Inscripcion,
  },
});

const UserModel = model('Inscripcion', inscripcionSchema, 'Inscripcion');

export { UserModel };

