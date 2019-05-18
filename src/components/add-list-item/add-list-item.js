import React, { Component } from 'react';
import './add-list-item.css';

export default class AddListItem extends Component {
constructor () {
    super();
    this.state = {label: ''};
}
updateInput = (event) => {
    this.setState({label : event.target.value})
    console.log(event.target.value)
            }

       submit = e => {
           e.preventDefault();
       if (this.state.label !== '') {
        this.props.onItemAdded(this.state.label);
        this.setState({label: ''});
       } 
    }
    render() {
        return (
            <form className='d-flex mt-3' onSubmit={this.submit}>
            <input placeholder="search" id='new-name' 
            className='form-control search-input'  onChange={this.updateInput}
            value={this.state.label}/>
            <button
            className="btn btn-sm new-item"
                >
                Add Item
                
</button>
</form>
)
    }


}
