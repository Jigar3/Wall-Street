import React from 'react';
import { connect } from 'react-redux';
import AddCompany from '../Actions/AddCompany';

class BuyPage extends React.Component {
  


  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements)
    const company = e.target.elements.symbol.value;
    const quantity = e.target.elements.quantity.value;
    const buyPrice = e.target.elements.buyPrice.value;
    const currPrice = e.target.elements.currPrice.value;
    const shareWorth = e.target.elements.shareWorth.value;
    const profitLoss = e.target.elements.profitLoss.value;
    
    const companyDetails = {
      company,
      quantity,
      buyPrice,
      currPrice,
      shareWorth,
      profitLoss
    }
    this.props.addData(companyDetails);
    
    e.target.elements.symbol.value = "";
    e.target.elements.quantity.value = "";
    e.target.elements.buyPrice.value = "";
    e.target.elements.currPrice.value = "";
    e.target.elements.shareWorth.value = "";
    e.target.elements.profitLoss.value = "";

    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit} >
          <input type="text" name="symbol" placeholder="Symbol"/>
          <input type="number" name="quantity" placeholder="Quantity"/>
          <input type="number" name="buyPrice" placeholder="Buy Price"/>
          <input type="number" name="currPrice" placeholder="Curr Price"/>
          <input type="number" name="shareWorth" placeholder="Share Worth"/>
          <input type="number" name="profitLoss" placeholder="Profit Loss" />
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