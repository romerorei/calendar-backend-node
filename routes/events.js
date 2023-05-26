
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helper/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();


// todas tienes que psasr por la vlaidacion
router.use( validarJWT );

// obtener eventos
router.get(
  '/', getEventos);

//crear eventos
router.post(
    '/',
    [
      check('title', 'El titulo es obligatorio').not().isEmpty(),
      check('start', 'La Fecha de inicio es obligatoria').custom( isDate ),
      check('end', 'La fecha final es obligatoria').custom( isDate ),
      validarCampos
    ],
    crearEvento);

// Actualizar Evento
router.put(
  '/:id',
  [
      check('title','El titulo es obligatorio').not().isEmpty(),
      check('start','Fecha de inicio es obligatoria').custom( isDate ),
      check('end','Fecha de finalización es obligatoria').custom( isDate ),
      validarCampos
  ],
  actualizarEvento
);

//Borrar Eventos
router.delete('/:id', eliminarEvento);


module.exports = router;
