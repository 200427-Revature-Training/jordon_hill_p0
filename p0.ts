/*
Jordon Hill
Revature
Project 0
p0.ts
*/

import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

app.use(bodyParser.json());
/*
function getPokemon(pokemon) {
    axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemon)
    .then(function(response) {
        console.log(response.data.species.name)
        return (response.data.species.name);
    })
    .catch(function(error) {
        console.log("Pokemon not found.");
        return "Pokemon not found.";
    });
}
*/
app.get("", async (request, response, next) => {
    console.log("Request received - processing at app.get");
    //response.json(users);
    //let data = await getPokemon(request.query.num);
    //console.log(await getPokemon(request.query.num));
    //console.log(data);
    //let species = data.species.name || data;
    axios.get("https://pokeapi.co/api/v2/pokemon/" + request.query.num)
        .then(function(resp) {
            //console.log(resp.data.species.name)
            response.send(resp.data.species.name);
        })
        .catch(function(error) {
            console.log("Pokemon not found.");
            response.send("Pokemon not found.");
        });
    //response.send(data);
    
}); 

app.post("/users", (request, response, next) => {
    console.log("Request received - processing at app.post")
    const body = request.body;
    console.log(body);
    if (body) {
        
    }
    //response.send(users);
    next();
}); 

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}.`)
});

//getPokemon("pikachu");