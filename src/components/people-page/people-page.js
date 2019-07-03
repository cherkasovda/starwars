import React, { Component } from 'react';
import ItemList from '../item-list/item-list';
import ItemDetails, { Record } from '../person-details/item-details';
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
                <ItemDetails
                        itemId={this.state.selectedPerson}
                        getData={this.swapiService.getPerson}
                        getImageUrl={this.swapiService.getPersonImage}>
                        <Record field="name" label="Name" />
                        <Record field="gender" label="Gender" />
                        <Record field="birthYear" label="Birth Year" />
                        <Record field="eyeColor" label="Eye Color" />
                </ItemDetails>
                    
                </ErrorBoundry>
            );
        return   <Row left ={itemList} right={personDetails}/>
    }
}