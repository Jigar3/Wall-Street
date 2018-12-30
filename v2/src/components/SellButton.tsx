import React from "react";
import { connect } from "react-redux";

import DeleteCompany from "../actions/DeleteCompany";
import SellAction from "../actions/Sell";
import Refresh from "../actions/Refresh";

import axios from "axios";
import { RoundOf } from "../utils/utils";

interface PassedProps {
    id: string,
    // currValue: number,
    deleteCompany: any,
    addToMoney: any,
    // quantity: number,
    // buyPrice: number,
    refresh: any,
    allValue: any
}

interface State {
    quantity: number,
    error: string
}

class SellButton extends React.Component<PassedProps, State> {

    state = {
        quantity: 0,
        error: ""
    }

    handleSubmit = (id, currValue, maxQuantity, buyPrice) => {
        if(this.state.quantity == maxQuantity) {
            this.props.deleteCompany(id);
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/state/company`, {data: {id}, headers: {"x-auth": localStorage.getItem("JWT_Token")}})
            this.props.addToMoney(RoundOf(maxQuantity * currValue, 2))
            this.setState({quantity: 0})
        } else if(this.state.quantity < maxQuantity && this.state.quantity > 0) {
                const changedQuantity = maxQuantity - this.state.quantity
                const shareWorth = RoundOf(changedQuantity * currValue, 2)
                const profitLoss = RoundOf((currValue - buyPrice) * changedQuantity, 2) 

                const companyDetails = {
                    ...this.props.allValue,
                    quantity: changedQuantity,
                    shareWorth,
                    profitLoss,
                    _id: id
                }

            axios.patch(`${process.env.REACT_APP_BACKEND_URL}/state/company`, companyDetails, {
                headers: {"x-auth": localStorage.getItem("JWT_Token")}
            }).then(() => {
                console.log("patch from sell button")
                this.props.refresh({id, companyDetails})
            })
            this.props.addToMoney(RoundOf(this.state.quantity * currValue, 2))
            
            
            this.setState({quantity: 0})
        } else {
            this.setState({error: "Invalid Quantity"})
        }
        
        
    }

    handleChange = (e) => {
        this.setState({quantity: e.target.value})
        this.setState({error: ""})
    }

    render() {
        return (
            <div>
                <button onClick={() => this.handleSubmit(this.props.id, this.props.allValue.currPrice, this.props.allValue.quantity, this.props.allValue.buyPrice)} >SELL</button>
                <input type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} required/>

                {this.state.error ? <p>{this.state.error}</p> : undefined }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCompany: id => {
            dispatch(DeleteCompany(id));
        },
        addToMoney: sellValue => {
            dispatch(SellAction(sellValue));
        },
        refresh: ({id, companyDetails}) => {
            dispatch(Refresh({id, companyDetails}));
        }
    }
}

export default connect(null, mapDispatchToProps)(SellButton);