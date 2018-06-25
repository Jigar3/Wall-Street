import React from "react";
import Table from "./Table";
import { connect } from "react-redux";

class DashboardPage extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h2>{`Total money left is $${this.props.money.money}`}</h2>
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

export default connect(mapStatetoProps)(DashboardPage);
