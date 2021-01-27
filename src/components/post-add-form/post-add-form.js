import React, {Component} from 'react';

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    onValueChange(event) {
        const value = event.target.value;
        this.setState({
            text: value
        });
    };

    onSubmit(event) {
        event.preventDefault();
        this.props.onAdd(this.state.text);
        this.setState({
            text: ''
        })
    };

    render() {
        return (
            <form className="bottom-panel d-flex"
               onSubmit={this.onSubmit}
            >
                <input className="form-control new-post-label"
                    type="text"
                    placeholder="what do you think now?"
                    onChange={this.onValueChange}
                    value={this.state.text}
                />
                <button type="submit" className="btn btn-secondary">
                    to add post
                </button>
            </form>
        )
    }
};

 