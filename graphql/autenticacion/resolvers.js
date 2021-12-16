import { UserModel } from "../../models/usuario/usuario.js";
import bcrypt from 'bcrypt';
import { generarToken } from '../../utilidades/tokenUtils.js'

const resolversAutenticacion = {
    Mutation: {
        registro: async (parent, args) => {
            try {
                const salteo = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(args.password, salteo);
                const usuarioCreado = await UserModel.create({
                    nombre: args.nombre,
                    apellido: args.apellido,
                    identificacion: args.identificacion,
                    correo: args.correo,
                    rol: args.rol,
                    password: hashedPassword,
                });
                console.log('Usuario creado con éxito', usuarioCreado);

                return {
                    token: generarToken({
                        _id: usuarioCreado._id,
                        nombre: usuarioCreado.nombre,
                        apellido: usuarioCreado.apellido,
                        identificacion: usuarioCreado.identificacion,
                        correo: usuarioCreado.correo,
                        rol: usuarioCreado.rol,
                    }),
                    authorized: true,
                };
            } catch (e) {
                return {
                    error: e,
                };
            }
        },
        login: async (parent, args) => {
            const usuarioEcontrado = await UserModel.findOne({ correo: args.correo });
            if (await bcrypt.compare(args.password, usuarioEcontrado.password)) {
                return {
                    token: generarToken({
                        _id: usuarioEcontrado._id,
                        nombre: usuarioEcontrado.nombre,
                        apellido: usuarioEcontrado.apellido,
                        identificacion: usuarioEcontrado.identificacion,
                        correo: usuarioEcontrado.correo,
                        rol: usuarioEcontrado.rol,
                    }),
                    authorized: true,
                };
            } else {
                return {
                    error: 'not auth',
                };
            }
        },
        validateToken: async (parent, args, context) => {
            if (!context.auth.user) {
                return {
                    token: null,
                    authorized: false,
                };
            } else {
                return {
                    token: generateToken(context.auth.user),
                    authorized: true,
                };
            }
        },


        refrescarToken: async (parent, args, context) => {
            console.log('contexto', context);
            if (!context.userData) {
                console.log("NO tenemos user data")
                return {
                    error: 'Token inválido',
                    token: null,
                    authorized: false,
                };
            } else {
                console.log("si tenemos user data")
                return {
                    token: generarToken({
                        _id: context.userData._id,
                        nombre: context.userData.nombre,
                        apellido: context.userData.apellido,
                        identificacion: context.userData.identificacion,
                        correo: context.userData.correo,
                        rol: context.userData.rol,
                    }),
                    authorized:true,
                };
            }
        },
    }
};

export { resolversAutenticacion };