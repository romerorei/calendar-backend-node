// rutas de usuarios / auth
//host + api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { userCreate, userLogin, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
  '/new',
  [ // middleware
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
  ],
  userCreate );

router.post(
  '/',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'El password es requerido y debe tener 6 caracteres').isLength({ min: 6 }),
    validarCampos
  ],
  userLogin );

router.get('/renew', validarJWT, revalidarToken )

module.exports = router;
