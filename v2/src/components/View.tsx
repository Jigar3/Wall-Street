import React from "react";
import axios from "axios";
import { getUpdate } from "../utils/utils";

const _ = require("lodash");

class View extends React.Component {

    state = {
        symbol: "",
        quote: null
    }

    getData = () => {
        axios.
            get(`${process.env.REACT_APP_API_URL}/${this.state.symbol}/batch?types=quote`).
            then(data => {
                this.setState({quote: data.data.quote, symbol: ""});
            })
    }

    handleEnterPress = (e) => {
        if(e.key === 'Enter') {
            this.getData();
        }
    }

    handleClick = () => {
        this.getData();
    }

    handleOnChange = (e) => {
        this.setState({symbol: e.target.value})
    }

    render() {
        return (
            <div>
                <input 
                    type="text" 
                    name="symbol"
                    onChange={this.handleOnChange}
                    onKeyPress={this.handleEnterPress}
                    autoComplete={"off"}
                    value={this.state.symbol}
                />
                <button onClick={this.handleClick}>Ok</button>

                <br/>

                {_.isEmpty(this.state.quote) ? undefined : 
                    <p>
                        {this.state.quote.companyName} | {this.state.quote.open} | {this.state.quote.high} | {this.state.quote.low} | {this.state.quote.close}
                    </p>
                }
            </div>
        )
    };
};

export default View;