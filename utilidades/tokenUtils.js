
import jwt from 'jsonwebtoken';

const generarToken = (payload) => {
  return jwt.sign(payload, 'secret', {
    expiresIn: '48h',
  });
};

const validateToken = (token) => {
  if (token) {
    const verificacion = jwt.verify(token, 'secret', (err, data) => {
      if (data) {
        return {
          data: data,
        };
      }
      if (err) {
        return {
          error: err,
        };
      }
    });
    console.log(verificacion, token);
    return verificacion;
  }
};

export { generarToken, validateToken };