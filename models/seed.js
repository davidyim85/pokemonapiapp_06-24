const mongoose = require('./connection');
const pokemonData = require('./seedData');
const PokemonModel = require('./pokemon'); //this is model is need to tell Mongo Db what and how to add things into the db

mongoose.connection.on('open', async () => {
    const scrubbedData = pokemonData.map(pokemon => {
        return {
            id: pokemon.id,
            name: pokemon.name,
            img: pokemon.img,
            type: pokemon.type, 
            stats: pokemon.stats
        }
    });

    //Delete all the pokemon records in the db.
    //we wanted the 'seeded' stated to be consistent so we delete everything to start from scratch
    //prior to adding on the scrubbed data
    await PokemonModel.deleteMany({});

    //using the scrubbed Data we will insert those records into the db
    await PokemonModel.create(scrubbedData);
    //because the "const mongoose = require('./connection')" line establishes a connection, 
    //we want to close out the connection AFTER all the data been added.
    mongoose.connection.close();
});


