import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { RoundOf } from "../utils/utils";
import BuyAction from "../actions/Buy";
import Addcompany from "../actions/Addcompany";

import { history } from "../router/Approuter";

interface State {
    symbol: string,
    quantity: number,
    shareWorth: number,
    loader: boolean,
    symerror: string,
    quanerror: string
}

class Buy extends React.Component<any, State> {

    state = {
        symbol: "",
        quantity: undefined,
        shareWorth: 0,
        loader: false,
        symerror: "",
        quanerror: ""
    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({loader: true});
        if(this.state.quantity <= 0 || this.state.quantity % 1 !== 0) {
            this.setState({quanerror: "Please enter a Positive Integer as quantity", loader: false, symbol: "", quantity: 0})
            return -1;
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/${this.state.symbol}/batch?types=quote`)
            .then(data => {

                const shareWorth = RoundOf(data.data.quote.latestPrice * this.state.quantity, 2);

                if ( shareWorth > this.props.money.money ) {
                    this.setState({
                        quanerror: "Don't have enough cash", 
                        loader: false,
                        symbol: "",
                        quantity: null
                    });
                    return -1;
                } else {
                    this.setState({shareWorth});
                    this.setState({loader: false});

                    const companyDetails = {
                        company: this.state.symbol[0],
                        quantity: this.state.quantity[0],
                        shareWorth: this.state.shareWorth,
                        companyName: data.data.quote.companyName,
                        currPrice: data.data.quote.latestPrice,
                        buyPrice: data.data.quote.latestPrice,
                        profitLoss: 0
                    }

                    this.props.subtractFromMoney(this.state.shareWorth);
                    
                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/state/company`, companyDetails, {headers: {"x-auth": localStorage.getItem("JWT_Token")}}).then((data) => {
                        this.props.addCompany(data.data);
                    })

                    this.setState({
                        symbol: "",
                        quantity: undefined
                    })

                    history.push("/");
                    }
                }
            ).catch(() => {
                this.setState({symerror: "Please check if you have entered correct symbol", loader: false})
            })
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name] : [e.target.value]
        } as Pick<State, 'symbol' | 'quantity'> )

        this.setState({
            symerror: "",
            quanerror: ""
        })
    }

    render() {
        return (
            <section className="section">
                <div className="container">

                    <h1 className="title is-3" > <span className="has-text-primary is-uppercase">Total Money Left : </span> <span className="is-pulled-right">$ {this.props.money.money}</span> </h1>

                    <form onSubmit={this.handleSubmit}>
                        
                        <div className="field">
                            <label className="label">Symbol</label>
                            <div className="control">
                                <input className="input" type="text" name="symbol" required onChange={this.handleOnChange} value={this.state.symbol} placeholder="Enter a NASDAQ Stock Symbol"/>
                                <p className="help is-danger">{this.state.symerror == "" ? undefined : this.state.symerror}</p>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Quantity</label>
                            <div className="control">
                                <input className="input" type="number" name="quantity" required onChange={this.handleOnChange} value={this.state.quantity} placeholder="Enter Number of Stocks to Buy" />
                                <p className="help is-danger">{this.state.quanerror == "" ? undefined : this.state.quanerror}</p>
                            </div>
                        </div>
                        
                        <div className="field">
                            <div className="control">
                            {this.state.loader ? <button className="button is-primary is-loading is-fullwidth" >Loading</button> : <button className="button is-primary is-outlined is-fullwidth" >Submit</button> }
                            </div>
                        </div>
                    </form>

                    
                    

                    
                </div>
        
            </section>    
        )
    };
};

const mapStateToProps = (state) => {
    return {
        money: state.money
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        subtractFromMoney: buyValue => {
            dispatch(BuyAction(buyValue));
        },
        addCompany: companyDetails => {
            dispatch(Addcompany(companyDetails))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buy);