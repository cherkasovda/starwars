import React from 'react';
import './item-status.css';


export default class ItemStatusFilter extends React.Component {
    constructor() {
        super();
        this.state = {
            filterItems: 'all'
        };
    }

    onClick(filterItems) {
        this.setState({ filterItems })
        this.props.onFilterItemsChange(filterItems)
    }


    render() {

        return (
            <div className="btn-group">
                <button type="button" onClick={() => this.onClick('all')} className={`btn btn-outline-secondary ${this.state.filterItems === "all" ? 'active' : ''}`}>All</button>
                <button type="button" onClick={() => this.onClick('active1')} className={`btn btn-outline-secondary ${this.state.filterItems === "active1" ? 'active' : ''}`}>Active
                </button>
                <button type="button" onClick={() => this.onClick('done')} className={`btn btn-outline-secondary ${this.state.filterItems === "done" ? 'active' : ''}`}>Done</button>
                <button type="button" onClick={() => this.onClick('important')} className={`btn btn-outline-secondary ${this.state.filterItems === "important" ? 'active' : ''}`}>Important</button>
            </div>
        )
    }
}