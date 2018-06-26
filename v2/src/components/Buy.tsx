import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { RoundOf } from "../utils/utils";
import BuyAction from "../actions/Buy";

interface State {
    symbol: string,
    quantity: number,
    buyPrice: number
}

class Buy extends React.Component<any, State> {

    state = {
        symbol: "",
        quantity: 0,
        buyPrice: 0
    }

    handleSubmit = e => {
        e.preventDefault();
        axios
            .get(`https://api.iextrading.com/1.0/stock/${this.state.symbol}/batch?types=quote`)
            .then(data => {
                this.setState({buyPrice: RoundOf(data.data.quote.latestPrice * this.state.quantity, 2)});

                this.props.subtractFromMoney(this.state.buyPrice);

                this.setState({
                    symbol: "",
                    quantity: 0
                })
            })
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name] : [e.target.value]
        } as Pick<State, 'symbol' | 'quantity'> )
    }

    showBuyPrice = () => {
        if(this.state.buyPrice != 0) {
            return <p>{this.state.buyPrice}</p>
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

                {this.showBuyPrice()}
                <p>
                    Money : {this.props.money.money}
                </p>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buy);