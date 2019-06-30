import React, { Component } from 'react';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import ErrorBoundry, {ErrorIndicator} from "../error-indication/error-indication";
import SwapiService from "../../services/swapi-service"
import Row from "../row/row"
// import './people-page.css';


export default class PeoplePage extends Component {
    swapiService = new SwapiService();
    state = {
    selectedPerson: null,
    hasError: false
    };

      onPersonSelected = (selectedPerson) => {
        this.setState({
            selectedPerson
        })
    };

    render() {
        if (this.state.hasError) return <ErrorIndicator />;
        const itemList = (
            <ItemList onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople} >
                {({ name, gender, birthYear }) => `${name}  (${gender}, ${birthYear})`}
            </ItemList>
        ),
            personDetails = (
                <ErrorBoundry>
                    <PersonDetails personId={this.state.selectedPerson} />
                </ErrorBoundry>
            );
        return   <Row left ={itemList} right={personDetails}/>
    }
}