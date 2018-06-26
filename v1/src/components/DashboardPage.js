import React from "react";
import Table from "./Table";
import { connect } from "react-redux";
import Refresh from "../Actions/Refresh";

class DashboardPage extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h2 className="display-3">{`Total money left : $${
            this.props.money.money
          }`}</h2>
          <button
            className="btn btn-lg btn-primary btn-refresh"
            onClick={this.props.refresh}
          >
            Refresh
          </button>
        </div>
        <Table />
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    money: state.money,
    portfolio: state.portfolio
  };
};

const mapDispatchToProps = dispatch => {
  return {
    refresh: () => {
      dispatch(Refresh());
    }
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(DashboardPage);
