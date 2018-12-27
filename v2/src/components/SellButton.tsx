import React from "react";
import { connect } from "react-redux";

import DeleteCompany from "../actions/DeleteCompany";
import SellAction from "../actions/Sell";
import axios from "axios";

interface PassedProps {
    id: string,
    sellValue: number,
    deleteCompany: any,
    addToMoney: any
}

class SellButton extends React.Component<PassedProps, any> {

    handleSubmit = (id, sellValue) => {
        this.props.deleteCompany(id);
        axios.delete("http://localhost:3001/state/company", {data: {id}})
        this.props.addToMoney(sellValue)
    }

    render() {
        return (
            <div>
                <button onClick={() => this.handleSubmit(this.props.id, this.props.sellValue)} >SELL</button>
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
        }
    }
}

export default connect(null, mapDispatchToProps)(SellButton);