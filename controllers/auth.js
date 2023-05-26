const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helper/jwt');


const userCreate = async(req, res = response ) => {
  const { email, password } = req.body;
  try{
    let usuario = await Usuario.findOne({ email });
    console.log(usuario);

    if ( usuario ) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario existe con ese correo'
      })
    }

    usuario = new Usuario( req.body );
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    await usuario.save();

    //generar jwt
    const token = await generarJWT( usuario.id, usuario.name );

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      email: usuario.email,
      token

    })


  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error en regiter:('
    })

  }

};

const userLogin = async( req, res = response) => {

  const { email, password } = req.body;

  try {

    const usuario = await Usuario.findOne({ email });

    if ( !usuario ) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario y password no son correctos'
      })
    }

    //confirmar los password
    const validPassword = bcrypt.compareSync( password, usuario.password );

    if ( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      });
    }

      //Generar nuestro JWT
    const token = await generarJWT( usuario.id, usuario.name );

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    })
    console.log('token:', token)

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error en login:('
    })
  }

};

const revalidarToken = async(req, res = response) => {

  const { uid, name } = req;

  //generar un nuevo JWT y retornarlo en esta peticion
  const token = await generarJWT( uid, name );

  res.json({
    ok: true,
    msg:'renew',
    token
  })
};


module.exports = {
  userCreate,
  userLogin,
  revalidarToken
}
