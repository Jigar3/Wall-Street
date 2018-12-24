import React from "react";
import { connect } from "react-redux";

import DeleteCompany from "../actions/DeleteCompany";
import SellAction from "../actions/Sell";

interface PassedProps {
    index: number,
    sellValue: number,
    deleteCompany: any,
    addToMoney: any
}

class SellButton extends React.Component<PassedProps, any> {

    handleSubmit = (index, sellValue) => {
        this.props.deleteCompany(index);
        this.props.addToMoney(sellValue)
    }

    render() {
        return (
            <div>
                <button onClick={() => this.handleSubmit(this.props.index, this.props.sellValue)} >SELL</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCompany: index => {
            dispatch(DeleteCompany(index));
        },
        addToMoney: sellValue => {
            dispatch(SellAction(sellValue));
        }
    }
}

export default connect(null, mapDispatchToProps)(SellButton);