const { Router } = require('express');
// Importar los routers;
const routeRaces = require ('./dogs.js');
const routeTempers = require ('./tempers.js');


const router = Router();
router.use('/dogs', routeRaces);
router.use('/temperament', routeTempers);



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
