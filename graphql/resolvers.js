import { resolversProyecto } from '../models/proyecto/resolvers.js';
import { resolversUsuario } from '../models/usuario/resolvers.js';
import { resolversAvance } from '../models/avance/resolvers.js';
import {resolversAutenticacion} from './autenticacion/resolvers.js'
import { resolversInscripcion } from '../models/inscripcion/resolvers.js';


export const resolvers = [resolversUsuario, resolversProyecto, resolversAvance, resolversAutenticacion, resolversInscripcion];
