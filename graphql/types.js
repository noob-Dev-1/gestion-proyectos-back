import { gql } from 'apollo-server-express';
import { tiposEnums } from '../models/enums/tipos.js';
import { tiposUsuario } from '../models/usuario/tipos.js';
import { tiposProyecto } from '../models/proyecto/tipos.js';
import { tiposAvance } from '../models/avance/tipos.js';
import { tiposAutenticacion } from './autenticacion/tipos'

const tiposGlobales = gql`
  scalar Date
`;

export const tipos = [tiposGlobales, tiposEnums, tiposUsuario, tiposProyecto, tiposAvance, tiposAutenticacion];
