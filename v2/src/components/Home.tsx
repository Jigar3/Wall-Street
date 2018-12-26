import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import SellButton from "./SellButton";
import Refresh from "../actions/Refresh";
import { getUpdate, RoundOf } from "../utils/utils";
import SellAction from "../actions/Sell";
import BuyAction from "../actions/Buy";

interface PassedProps {
	money: {
			money: number
	},
	portfolio: any,
	refresh: any,
	addToMoney: any
}

class Home extends React.Component <PassedProps> {

	state = {
		intervalId: null
	    // assetValue: this.props.money.money
	}

			
	componentDidMount() {
		
			let interval = setInterval(this.update, 2000);
			this.setState({intervalId: interval});

			// let assets = 0;
			//         this.props.portfolio.map(item => {
			//             assets = assets + item.shareWorth;
			//         })
			//         assets = assets + this.props.money.money;
			//         this.setState({assetValue: assets})
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}

	// x = 1

	update = () => {
		
		this.props.portfolio.map((item, index) => {
			getUpdate(item.company).then(data => {
					// this.x = this.x+1;
					// data.data.quote.latestPrice = this.x
					let companyDetails = {
							...item,
							currPrice: data.data.quote.latestPrice,
							profitLoss: RoundOf((data.data.quote.latestPrice - item.buyPrice) * item.quantity, 2),
							shareWorth: RoundOf(item.quantity * data.data.quote.latestPrice, 2)
					};
					this.props.refresh({index, companyDetails});
			});
	})
	}


	render() {
		return (
				<div>
						<NavLink to="/buy">
								Buy
						</NavLink>
						<NavLink to="/view">
								View
						</NavLink>
						<NavLink to="/assets">
								Assets
						</NavLink>

						<br/>

						<a href="http://www.isnasdaqopen.com/" target="_blank">Check If Nasdaq is open</a>

						<h2>Total Money Left with you: </h2>
						<p>{this.props.money.money}</p>
						<h2>Portfolio</h2>
						
						{
								this.props.portfolio.map((e, index) => {
										return (
												<React.Fragment key={e.company}>
														{index} | {e.company} | {e.quantity} | {e.buyPrice} | {e.shareWorth} 
														| {e.currPrice} | {e.profitLoss} | 
														<SellButton index={index} sellValue={e.shareWorth}></SellButton> 
												</React.Fragment>
										)
										}
								)
						}

						{/* <button onClick={this.update} >Refresh</button> */}

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
			},
			addToMoney: (value) => {
					dispatch(SellAction(value));
			},
			subtractFromMoney: (value) => {
					dispatch(BuyAction(value));
			}
	}
}

export default connect(mapStateToProps, mapDisptachToProps)(Home);

