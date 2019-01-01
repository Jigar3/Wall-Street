import React from "react";
import axios from "axios";
import { getUpdate } from "../utils/utils";

const _ = require("lodash");

class View extends React.Component {

    state = {
        symbol: "",
        quote: null,
        loading: false,
        error: ""
    }

    getData = () => {
        this.state.loading = true
        axios.
            get(`${process.env.REACT_APP_API_URL}/${String(this.state.symbol).trim()}/batch?types=quote`).
            then(data => {
                this.setState({quote: data.data.quote, symbol: "", loading: false});
            }).catch(() => {
                this.setState({error: "Please check the Stock Symbol again", loading: false})
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
        this.setState({symbol: e.target.value, quote: null, error: ""})
    }

    render() {
        return (
            <div className="container" id="search_box_view">

                <div className="field is-horizontal">
                    <div className="control has-icons-right field-label">
                        <span className="icon is-small is-right">
                            <img src={require("../assets/search.png")} alt=""/>
                        </span>
                        <input 
                            className="input"
                            type="text" 
                            name="symbol"
                            onChange={this.handleOnChange}
                            onKeyPress={this.handleEnterPress}
                            autoComplete={"off"}
                            value={this.state.symbol}
                            placeholder="Enter a NASDAQ Stock Symbol(Ex. AAPL)"
                        />
                        {this.state.error ? <p className="help is-danger">{this.state.error}</p> : undefined}
                    </div>

                    <div className="field-item">
                        {this.state.loading ? <button onClick={this.handleClick} className="button is-link is-loading" >Loading</button> :
                        <button className="button is-link" onClick={this.handleClick} >Search</button>}
                    </div>
                </div>


                {_.isEmpty(this.state.quote) ? undefined : 
                    <ul className="view_list">
                        <li>Company Name: <span>{this.state.quote.companyName}</span></li>
                        <li>Symbol: <span>{this.state.quote.symbol}</span></li>
                        <li>Sector: <span>{this.state.quote.sector}</span></li>
                        <li>Current Price: <span>{this.state.quote.latestPrice}</span></li>
                        <li>Open Price: <span>$ {this.state.quote.open}</span></li> 
                        <li>Hign Price <span>$ {this.state.quote.high}</span></li> 
                        <li>Low Price <span>$ {this.state.quote.low}</span></li> 
                        <li>Close Price: <span>$ {this.state.quote.close}</span></li>
                        <li>52 Week High: <span>$ {this.state.quote.week52High}</span></li>
                        <li>52 Week Low: <span>$ {this.state.quote.week52Low}</span></li>
                    </ul>
                }
            </div>
        )
    };
};

export default View;