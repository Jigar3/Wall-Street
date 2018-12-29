import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import SellButton from "./SellButton";
import Asset from "./Assets";
import Refresh from "../actions/Refresh";
import { getUpdate, RoundOf } from "../utils/utils";
import SellAction from "../actions/Sell";
import BuyAction from "../actions/Buy";
import { getInitialValue } from "../utils/utils"

import "../styles/main.css"
import axios from "axios";

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

	componentDidUpdate(prevProps) {
		if(this.props.portfolio.length !== prevProps.portfolio.length) {
			this.props.portfolio.map(item => {
				axios.patch("http://localhost:3001/state/company", item, {headers: {"x-auth": localStorage.getItem("JWT_Token")}})
			})
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}

	update = () => {
		this.props.portfolio.map((item, index) => {
			const id = item._id
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
					<NavLink to="/signup">Sign Up</NavLink>
					<NavLink to="/login">Log In</NavLink>
					<NavLink to="/logout">Log Out</NavLink>
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
								<tr key={e._id}>
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

