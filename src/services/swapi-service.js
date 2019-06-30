// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/app/app'

// ReactDOM.render(<App/>, document.getElementById('root'));

// fetch('https://swapi.co/api/people/1/')
//     .then(resp => resp.json())
//     .then(data => { console.log(data) });

// const getSwData = url =async  => => {
//     const resp = await fetch(url);

//     console.log(resp);
//     if (!resp.ok) {
//         if (resp.status === 404) {
//             throw new Error(`bad request ${url}, received ${resp.status}`);
//         } else {
//             throw new Error('bad request');

//         }
//     }
//     return await resp.json();
// };

// getSwData('https://swapi.co/api/people/121323')
//     .then(data => {
//         console.log(data)
//     })
//     .catch(err => console.log('Could not fetch', err));

export default class SWApiService {
    _apiBase = 'https://swapi.co/api';
    getSwData = async (url) => {
        const resp = await fetch(this._apiBase + url);
        if (!resp.ok)
            throw new Error(`bad request ${url}, received ${resp.status}`);
        return await resp.json();
    }

    getAllPeople = async () => {
        const resp = await this.getSwData('/people')
        return resp.results.map(SWApiService._transformPerson);
    }
    getPerson = async (id) => {
        const person = await this.getSwData('/people/' + id);
        return SWApiService._transformPerson(person);

    }

    getAllPlanets = async () => {
        const resp = await this.getSwData('/planets')
        return resp.results.map(SWApiService._transformPlanet);
    }

    getPlanet = async (id) => {
        const planet = await this.getSwData('/planets/' + id);
        return SWApiService._transformPlanet(planet);

    }

    getAllStarShips = async () => {
        const resp = await this.getSwData('/starships')
        return resp.results.map(SWApiService._transformStarship);
    }
    getStarship = async (id) => {
        const starship = await this.getSwData('/starships/' + id);
        return SWApiService._transformPlanet(starship);

    }

    static _extractId(item) {
        const regExp = /\/([0-9]*)\/$/;
        return item.url.match(regExp)[1];
    }
    static _transformPlanet(planet) {
        return {
            id: SWApiService._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_Period,
            diameter: planet.diameter
        }
    }
    static _transformStarship(starship) {
        return {
            id: SWApiService._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    };

    static _transformPerson(person) {
        return {
            id: SWApiService._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color
        }
    }
}
//
// const swapi = new SWApiService();
// swapi.getAllPeople().then(
//     people => {
//         people.forEach(person => {
//             console.log(person.name);
//         });
//     });
// swapi.getPerson(3).then(person => {
//     console.log('Person', person.name)
// });
//
