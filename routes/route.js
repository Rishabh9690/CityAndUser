const express= require('express');
const router= express.Router();
const axios= require('axios');

const cityController= require('../controllers/cityController');
const { response } = require('express');

router.post('/creatingCity', cityController.createCity);
router.get('getAllData', cityController.getCities);

// axios.get('https://api.binance.com/api/v1/time').then(response=>{
//     console.log(response.data.url);
//     console.log(response.data.explanation);
// }).catch(err=>{console.log(err)});

router.post('createUser', cityController.createUser);
router.get('getAllUserData', cityController.getUser);
router.put('updateById', cityController.updateById);

module.exports= router;