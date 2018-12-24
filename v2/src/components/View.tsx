import React from "react";
import axios from "axios";

const _ = require("lodash");

class View extends React.Component {

    state = {
        symbol: "",
        quote: null
    }

    handleSubmit = (e) => {
        if(e.key === 'Enter') {
            axios.
            get(`https://api.iextrading.com/1.0/stock/${this.state.symbol}/batch?types=quote`).
            then(data => {
                this.setState({quote: data.data.quote, symbol: ""});
            })
        }
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
                    onKeyPress={this.handleSubmit}
                    autoComplete={"off"}
                    value={this.state.symbol}
                />
                <button onClick={this.handleSubmit}>Ok</button>

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