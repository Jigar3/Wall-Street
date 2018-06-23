import React from 'react';
import { connect } from 'react-redux';
import AddCompany from '../Actions/AddCompany';
import axios from 'axios';

class BuyPage extends React.Component {
  


  handleOnSubmit = (e) => {
    e.preventDefault();
    const company = e.target.elements.symbol.value;
    const quantity = parseFloat(e.target.elements.quantity.value);
    axios.get(`https://api.iextrading.com/1.0/stock/${company}/batch?types=quote`).then((data) => {
      const buyPrice = data.data.quote.latestPrice;
      const companyDetails = {
        company,
        quantity,
        buyPrice,
        currPrice : parseFloat(data.data.quote.latestPrice).toFixed(2),
        shareWorth : (quantity * data.data.quote.latestPrice),
        profitLoss : 0
      }

      this.props.addData(companyDetails);
    }).catch((e) => {
      console.log(e);
    })
    
    e.target.elements.symbol.value = "";
    e.target.elements.quantity.value = "";

    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit} >
          <label>Symbol: </label>
          <input type="text" name="symbol" placeholder="Symbol" required />
          <br></br>
          <br></br>
          <label>Quantity: </label>
          <input type="number" name="quantity" placeholder="Quantity" required />
          <br></br>
          <br></br>
          <button>Submit</button>
        </form>
      </div>
    )  
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    addData : (companyDetails) => {
        dispatch(AddCompany(companyDetails));
    }
  }
}


export default connect(undefined, mapDispatchToProps)(BuyPage);