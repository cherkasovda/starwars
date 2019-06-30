import React, { Component } from 'react';

import Spinner from '../spinner/spinner';
import ErrorIndication from '../error-indication/error-indication';
import SwapiService from '../../services/swapi-service';

import './random-planet.css';

export default class RandomPlanet extends Component {
    constructor() {
        super();
        this.swapiService = new SwapiService();
        this.state = {
            planet: {},
            loading: true
        };

    }

    onPlanetLoader = (planet) => {
        this.setState({
            planet,
            loading: false,
            error: false

        });
    }
    onError = (err) => {
        this.setState(
            {
                error: true,
                loading: false
            }
        )
    }
    updatePlanet = () => {
        console.log('update');
        const id = Math.floor(Math.random() * 17) + 2;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoader)
            .catch(this.onError);
    };

    componentDidMount() {
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 5000)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {

        const { planet, loading, error } = this.state;
        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndication /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <PlanetView planet={planet} /> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const PlanetView = ({ planet }) => {

    const { id, name, population,
        rotationPeriod, diameter } = planet;

    return (
        <React.Fragment>
            <img className="planet-image" alt={`Planet ${id}`}
                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};
