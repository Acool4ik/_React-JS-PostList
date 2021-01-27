import React, {Component} from 'react';

export default class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.onValueChange = this.onValueChange.bind(this);
    };

    onValueChange(e) {
        const value = e.target.value;
        this.setState({
            text: value
        });
        this.props.onUpdateSearch(value)
    };

    render() {
        return (
            <input className="form-control search-input"
                type="text"
                placeholder="search for records"
                onChange = {this.onValueChange}
                value = {this.state.text}
            />
        )
    }
    
};
