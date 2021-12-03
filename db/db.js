import mongoose from 'mongoose';

const conectarBD = async () => {
  return await mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
      console.log('Conexion exitosa\nCorriendo en puerto: ' +`${process.env.PORT}`);
    })
    .catch((e) => {
      console.error('Error conectando a la bd', e);
    });
};

export default conectarBD;
