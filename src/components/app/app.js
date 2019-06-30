import React, { Component } from 'react';
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import ErrorButton from "../error-button/error-button";
import PeoplePage from "../people-page/people-page";
import './app.css';
import ErrorIndicator from "../error-indication/error-indication";
import SwapiService from "../../services/swapi-service";
import ItemList from "../item-list/item-list";
import PersonDetails from "../person-details/person-details";



export default class App extends Component {
    swapiService = new SwapiService();

    constructor(props) {
        super(props);
        this.state = {
            showRandomPlanet: true,
            selectedPerson: null,
            hasError: false

        };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true
        })
    }

    toggleRandomPlanet = () => {
        this.setState(state => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        }
        );
    };

    render() {
        if (this.state.hasError) return <ErrorIndicator />;
        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
        return (
            <div className="stardb-app">
                <Header />
                {planet}
                <button className="toggle-planet btn btn-warning btn-lg m-1" onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                </button>
                <ErrorButton />
                <PeoplePage />
                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onPersonSelected}
                            getData={this.swapiService.getAllPlanets}
                        >
                            {item => (<span>{item.name} <button> Example button</button></span>)} 
                        </ItemList>
                        
                    </div>
                    <div className="col-md-4">
                        <PersonDetails personId={this.state.selectedPlanets} />
                    </div>
                </div>
            </div>
        )
    }
}