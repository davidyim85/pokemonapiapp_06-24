const express = require('express');
const PokemonModel = require('../models/pokemon');

const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello World!')
});


router.get('/pokemon', async (req, res) => {
    //interact w/ my database to find all of the records
    const list = await PokemonModel.find();
    //then i want to send those records.
    res.send(list)
});

router.get('/pokemon/:id', async (req, res) => {
    try {
        const onePokemon = await PokemonModel.findById(req.params.id);
        res.send(onePokemon)
    }catch{
        res.status(400).send('error')
    }
});



router.post('/pokemon', async (req, res) => {
    try{
        const addedPokemon = await PokemonModel.create(req.body);
        res.send(addedPokemon)
    }catch{
        res.status(400).send('error')
    }
});

router.delete('/pokemon/:id', async (req, res) =>  {
    try{
        await PokemonModel.findByIdAndDelete(req.params.id)
        res.send('deleted')
    }catch{
        res.status(400).send('error')
    }
});


router.put('/pokemon/:id', async (req, res) =>  {
    try{
        await PokemonModel.findByIdAndUpdate(req.params.id, req.body)
        res.send('updated')
    }catch{
        res.status(400).send('error')
    }
});


module.exports = router;