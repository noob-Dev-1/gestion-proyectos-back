import mongoose from 'mongoose';

const conectarBD = async () => {
  return await mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
      console.log('Conexion exitosa');
    })
    .catch((error) => {
      console.error('Error conectando a la bd', error);
    });
};

export default conectarBD;
