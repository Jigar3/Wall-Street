import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

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
                <h2>Total Money Left with you: </h2>
                <p>{this.props.money.money}</p>
                <h2>Portfolio</h2>

                { console.log( this.props.portfolio)}
                
                {
                    this.props.portfolio.map(e => 
                        <p key={e.company}> {e.company} | {e.quantity} | {e.shareWorth} </p>
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

