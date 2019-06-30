import React, { Component } from 'react';
import './item-list.css';
// import SwapiService from "../../services/swapi-service"
import Spinner from '../spinner/spinner';
// import  Spinner from "../spinner/spinner"

export default class ItemList extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            itemList: null
        }
    }

    componentDidMount() {
        const { getData } = this.props;
        getData()
                    .then(itemList => {
                this.setState({ itemList });
            })
    }
    // componentDidMounth() {
    //     const { getData } = this.props;
    //     getData()
    //         .then(itemsList => {
    //         this.setState({itemsList})
    //     })
    // }
    // renderItems(items) {
    //     return items.map((item) => {
    //         const { id } = item,
    //             label = this.props.renderItem(item);
    //         return (
    //             <li className="list-group-item" key={id}
    //                 onclick={() => this.props.onItemSelected(id)}>
    //                 {label}
    //             </li>
    //         )
    //     })
    // }
    renderItems(items) {
        return items.map(( item ) => {
            const { id } = item,
            label = this.props.children(item);
            return (
                <li className="list-group-item" key={id}
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }
    render() {
        const { itemList } = this.state;
        if (!itemList) return <Spinner />
        return (
            <ul className="item-list list-group">
                {this.renderItems(itemList)}
            </ul>
        )
        //     const { itemsList } = this.state;
        //     if (!itemsList) return <Spinner />;
        //     return (
        //         <ul className="item-list list-group">
        //             {this.renderItems(itemsList)}
        //         </ul>
        //     )
        // }
    }
}