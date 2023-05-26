const jwt = require('jsonwebtoken');


const generarJWT = ( uid, name ) => {

  return new Promise( (resolve, reject) => {
    const payload = { uid, name };

    jwt.sign( payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '2h'
    }, ( err, token ) => {

      if ( err ){
        console.log('Nose se pudo generar el token:',err);
        reject('Nose se pudo generar el token');
      }
      resolve( token );
    })

  })

}

module.exports = {
  generarJWT
}
