import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { RoundOf } from "../utils/utils";
import BuyAction from "../actions/Buy";
// import AddCompanyAction from "../actions/Addcompany";
import Addcompany from "../actions/Addcompany";

interface State {
    symbol: string,
    quantity: number,
    shareWorth: number,
    loader: boolean
}

class Buy extends React.Component<any, State> {

    state = {
        symbol: "",
        quantity: 0,
        shareWorth: 0,
        loader: false
    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({loader: true});

        axios
            .get(`https://api.iextrading.com/1.0/stock/${this.state.symbol}/batch?types=quote`)
            .then(data => {
                this.setState({shareWorth: RoundOf(data.data.quote.latestPrice * this.state.quantity, 2)});
                this.setState({loader: false});

                const companyDetails = {
                    company: this.state.symbol[0],
                    quantity: this.state.quantity[0],
                    shareWorth: this.state.shareWorth,
                    currPrice: data.data.quote.latestPrice,
                    buyPrice: data.data.quote.latestPrice,
                    profitLoss: 0
                }

                // console.log("company", companyDetails)

                this.props.subtractFromMoney(this.state.shareWorth);
                this.props.addCompany(companyDetails);

                this.setState({
                    symbol: "",
                    quantity: 0
                })

                this.props.history.push("/");
            })
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name] : [e.target.value]
        } as Pick<State, 'symbol' | 'quantity'> )
    }

    showshareWorth = () => {
        if(this.state.shareWorth != 0) {
            return <p>{this.state.shareWorth}</p>
        } else {
            return null;
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Symbol</label>
                    <input type="text" name="symbol" required onChange={this.handleOnChange} value={this.state.symbol}/>

                    <label>Quantity</label>
                    <input type="number" name="quantity" required onChange={this.handleOnChange} value={this.state.quantity}/>

                    <button>Submit</button>
                </form>

                {this.showshareWorth()}
                <p>
                    Money : {this.props.money.money} <br/>
                </p>

                {this.state.loader ? <p>Waiting......</p> : undefined }
            </div>
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