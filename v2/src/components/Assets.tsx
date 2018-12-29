import React from "react";
import { connect } from "react-redux";

import { RoundOf } from "../utils/utils"

interface PassedProps {
    money: {
        money: number
    },
    portfolio: any
}

class Asset extends React.Component<PassedProps> {

    calcAsset = () => {
        let assets = 0;
        this.props.portfolio.map(item => {
            assets = assets + item.shareWorth;
        })
        
        return RoundOf(assets, 2);
    }

    render() {
        return (
            <div>
                <p>Money: {this.props.money.money}</p>
                <p>Total Assets: {this.calcAsset()}</p>
                <p> Total Value: {RoundOf(this.props.money.money + this.calcAsset(), 2)} </p>
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        portfolio: state.portfolio,
        money: state.money
    }
}

export default connect(mapStateToProps)(Asset);