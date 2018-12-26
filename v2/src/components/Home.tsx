import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import SellButton from "./SellButton";
import Asset from "./Assets";
import Refresh from "../actions/Refresh";
import { getUpdate, RoundOf } from "../utils/utils";
import SellAction from "../actions/Sell";
import BuyAction from "../actions/Buy";

import "../styles/main.css"

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
	}

			
	componentDidMount() {
		let interval = setInterval(this.update, 2000);
		this.setState({intervalId: interval});
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}

	update = () => {
		this.props.portfolio.map((item, index) => {
			const id = item.id
			getUpdate(item.company).then(data => {
				let companyDetails = {
						...item,
						currPrice: data.data.quote.latestPrice,
						profitLoss: RoundOf((data.data.quote.latestPrice - item.buyPrice) * item.quantity, 2),
						shareWorth: RoundOf(item.quantity * data.data.quote.latestPrice, 2)
				};
				this.props.refresh({id, companyDetails});
			});
		}
	)}


	render() {
		return (
			<div>
				<a href="http://www.isnasdaqopen.com/" target="_blank">Check If Nasdaq is open</a>
				<br/>
				<br/>
				
				<div id="nav">
					<NavLink to="/buy">Buy</NavLink>
					<NavLink to="/view">View</NavLink>
					<NavLink to="/assets">Assets</NavLink>
				</div>

				<br/>

				<h1>Total Money Left with you: $ {this.props.money.money}</h1>
				<Asset />
				<h2>Portfolio</h2>
				
				<table>
					<thead>
						<tr>
							<th>Company</th>
							<th>Quantity</th>
							<th>BuyPrice</th>
							<th>CurrentPrice</th>
							<th>ShareWorth</th>
							<th>ProfitLoss</th>
							<th>Sell Button</th>
						</tr>
					</thead>
					<tbody>
						{
						this.props.portfolio.map((e, index) => {
							return (
								<tr key={e.id}>
									<td>{e.companyName}</td>
									<td>{e.quantity}</td>
									<td>{e.buyPrice}</td>
									<td>{e.currPrice}</td>
									<td>{e.shareWorth}</td>
									<td>{e.profitLoss >= 0 ? <span id="profit">{e.profitLoss}</span> : <span id="loss">{e.profitLoss}</span>}</td>
									<td><SellButton id={e.id} sellValue={e.shareWorth}></SellButton></td>
								</tr>
								)}
							)
						}
					</tbody>
				</table>

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
			refresh: ({id, companyDetails}) => {
					dispatch(Refresh({id, companyDetails}));
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

