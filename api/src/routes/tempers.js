const {Router} = require('express');
const {Temper} = require('../db')
const axios = require('axios').default;

const router = Router(); // instanciamos router

router.get('/', async (req, res, next) => {
   let tempers = await Temper.findAll() 
   res.json(tempers)
})

/* router.('', (req, res, next) => {

}) */



module.exports = router;