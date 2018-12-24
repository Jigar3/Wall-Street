import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import SellButton from "./SellButton";
import Refresh from "../actions/Refresh";
import { getUpdate } from "../utils/utils";

interface PassedProps {
    money: {
        money: number
    },
    portfolio: any,
    refresh: any
}

class Home extends React.Component <PassedProps> {

    state = {
        symbol: ""
    }

    // componentDidMount() {
        
    update = () => {
        this.props.portfolio.map((item, index) => {
            getUpdate(item.company).then(data => {
                let companyDetails = {
                    ...item,
                    currPrice: data.data.quote.latestPrice
                };
                console.log(companyDetails);
                this.props.refresh({index, companyDetails});
            });
        })
    }
        
    // }


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
                                {index} | {e.company} | {e.quantity} | {e.shareWorth} | {e.currPrice} | <SellButton index={index} sellValue={e.shareWorth}></SellButton> 
                            
                            </React.Fragment>
                        )
                        }
                    )
                }

                <button onClick={this.update} >Refresh</button>

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

const mapDisptachToProps = (dispatch) => {
    return {
        refresh: ({index, companyDetails}) => {
            dispatch(Refresh({index, companyDetails}));
        }
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(Home);

