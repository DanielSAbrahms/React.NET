import React, { Component } from 'react';

export class Calculator extends Component {

    constructor(props) {
        super(props);
        this.state = { num1Value: null, num2Value: null, operation: null, result: null};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() { }

    handleChange(event) {
        var input = event.target.name;
        if (input === 'num1') {
            this.setState({ num1Value: event.target.value });
        } else if (input === 'num2') {
            this.setState({ num2Value: event.target.value });
        } else if (input === 'operation') {
            this.setState({ operation: event.target.value });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const body = {
            number1: parseFloat(this.state.num1Value),
            number2: parseFloat(this.state.num2Value),
            operation: this.state.operation
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }

        fetch('https://localhost:44351/Calculation', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ result: data });
            })
    }

    disableSubmit() {
        return !(this.state.num1Value &&
            (this.state.num2Value && this.state.num2Value != 0) &&
            this.state.operation)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Number 1</label>
                        <input type="number" name="num1" className="form-control" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Number 2</label>
                        <input type="number" name="num2" className="form-control" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Operation</label>
                        <select name="operation" className="form-control" onChange={this.handleChange} defaultValue={'DEFAULT'} >
                            <option disabled value="DEFAULT">-- Select One --</option>
                            <option value="Addition">Addition</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" disabled={this.disableSubmit()} className="form-control" />
                    </div>
                </form>
                <div>
                    {this.state.result ? <span> Result: {this.state.result} </span> : null}
                </div>
            </div>
        )
    }
}