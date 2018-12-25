import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

interface PassedProps {
    money: {
        money: number
    },
    portfolio: any
}

class Asset extends React.Component<PassedProps> {

    state = {
        money: this.props.money.money,
        // assetValue: 0
    }

    calcAsset = () => {
        let assets = 0;
        this.props.portfolio.map(item => {
            assets = assets + item.shareWorth;
        })

        // this.setState({assetValue: assets})
        return assets;
    }

    render() {
        return (
            <div>
                <NavLink to="/">
                    Home
                </NavLink>

                <p>Money: {this.state.money}</p>
                <p>Total Assets: {this.calcAsset()}</p>
                <p> Total Value: {this.state.money + this.calcAsset()} </p>
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