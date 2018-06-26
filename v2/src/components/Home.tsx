import React from "react";
import { connect } from "react-redux";

interface PassedProps {
    money: {
        money: number
    }
}

class Home extends React.Component <PassedProps> {
    render() {
        return (
            <div>
                <h2>Total Money Left with you: </h2>
                <p>{this.props.money.money}</p>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        money: state.money
    };
};

export default connect(mapStateToProps)(Home);

