import React from "react";
import { connect } from "react-redux";
import AddCompany from "../Actions/AddCompany";
import BuyAction from "../Actions/BuyAction";
import axios from "axios";
const as = require("as-type");

class BuyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  handleOnSubmit = e => {
    e.preventDefault();
    e.persist();
    const company = e.target.elements.symbol.value;
    const quantity = as.integer(e.target.elements.quantity.value);
    axios
      .get(`https://api.iextrading.com/1.0/stock/${company}/batch?types=quote`)
      .then(data => {
        const buyPrice = data.data.quote.latestPrice;
        const companyDetails = {
          company,
          quantity,
          buyPrice,
          currPrice: as.float(data.data.quote.latestPrice).toFixed(2),
          shareWorth: as
            .float(quantity * data.data.quote.latestPrice)
            .toFixed(2),
          profitLoss: 0
        };
        // console.log(this.props.money.money, companyDetails.shareWorth)
        if (this.props.money.money >= companyDetails.shareWorth) {
          this.props.subtractFromMoney(companyDetails.shareWorth);
          this.props.addData(companyDetails);

          e.target.elements.symbol.value = "";
          e.target.elements.quantity.value = "";

          this.props.history.push("/");
        } else {
          this.setState(() => {
            return {
              error: true
            };
          });
          e.target.elements.symbol.value = "";
          e.target.elements.quantity.value = "";
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <label>Symbol: </label>
          <input type="text" name="symbol" placeholder="Symbol" required />
          <br />
          <br />
          <label>Quantity: </label>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            required
          />
          <br />
          <br />
          {this.state.error ? <p>You don't have enough money</p> : undefined}
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    money: state.money
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addData: companyDetails => {
      dispatch(AddCompany(companyDetails));
    },
    subtractFromMoney: buyValue => {
      dispatch(BuyAction(buyValue));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyPage);
