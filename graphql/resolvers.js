import { resolversProyecto } from '../models/proyecto/resolvers.js';
import { resolversUsuario } from '../models/usuario/resolvers.js';
import { resolversAvance } from '../models/avance/resolvers.js';
import resolversAutenicacion from './autenticacion/resolvers'


export const resolvers = [resolversUsuario, resolversProyecto, resolversAvance, resolversAutenicacion];
