import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import SellButton from "./SellButton";

interface PassedProps {
    money: {
        money: number
    },
    portfolio: any
}

class Home extends React.Component <PassedProps> {

    // handleList = this.props.portfolio.forEach((e) => 
    //     <p>{e.company}</p>
    // );

    render() {
        return (
            <div>
                <NavLink to="/buy">
                    Buy
                </NavLink>
                <NavLink to="/view">
                    View
                </NavLink>
                <h2>Total Money Left with you: </h2>
                <p>{this.props.money.money}</p>
                <h2>Portfolio</h2>
                
                {
                    this.props.portfolio.map((e, index) => {
                        return (
                            <React.Fragment key={e.company}>
                                <p> {index} | {e.company} | {e.quantity} | {e.shareWorth} | <SellButton index={index} sellValue={e.shareWorth}></SellButton> </p>
                            
                            </React.Fragment>
                        )
                        }
                    )
                }

            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        money: state.money,
        portfolio: state.portfolio
    };
};

export default connect(mapStateToProps)(Home);

