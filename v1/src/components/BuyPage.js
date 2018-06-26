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
      <div className="custom-container container">
        <div className="row">
          <div className="col-lg-12">
            {" "}
            <form
              onSubmit={this.handleOnSubmit}
              className="form-group"
              autoComplete="off"
            >
              <div className="form-group">
                <label className="col-form-label col-form-label-lg">
                  Symbol
                </label>
                <input
                  type="text"
                  style={{ height: "70px", fontSize: "24px" }}
                  name="symbol"
                  placeholder="Enter Ticker Symbol"
                  className="form-control input-lg"
                  required
                />
              </div>

              <div className="form-group">
                <label className="col-form-label col-form-label-lg">
                  Quantity
                </label>
                <input
                  style={{ height: "70px", fontSize: "24px" }}
                  type="number"
                  name="quantity"
                  placeholder="Enter Quantity"
                  className="form-control input-lg"
                  id="inputlg"
                  required
                />
              </div>
              {this.state.error ? (
                <p>You don't have enough money</p>
              ) : (
                undefined
              )}
              <button className="btn btn-primary btn-lg btn-block">
                Submit
              </button>
            </form>
          </div>
        </div>
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
