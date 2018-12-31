import React from "react";
import { connect } from "react-redux";

import { RoundOf } from "../utils/utils"
import "../styles/main.css"

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
                <nav className="level">
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Money</p>
                            <p className="title">$ {this.props.money.money}</p>
                        </div>
                    </div>

                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Total Assets</p>
                            <p className="title">$ {this.calcAsset()}</p>
                        </div>
                    </div>

                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Total Value</p>
                            <p className="title">$ {RoundOf(this.props.money.money + this.calcAsset(), 2)}</p>
                        </div>
                    </div>

                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Total Profit or Loss</p>
                            <p className="title" id={RoundOf(this.props.money.money + this.calcAsset() - 10000, 2) >= 0 ? "profit" : "loss"}> 
                                $ {RoundOf(this.props.money.money + this.calcAsset() - 10000, 2)}
                                {RoundOf(this.props.money.money + this.calcAsset() - 10000, 2) >= 0 ? <img id="arrow" src={require("../assets/arrow-up.png")} alt=""/> : <img id="arrow" src={require("../assets/arrow-pointing-down.png")} alt=""/> }
                            </p>
                        </div>
                    </div>
                </nav>
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