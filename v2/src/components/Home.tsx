import React from "react";
import { connect } from "react-redux";

import SellButton from "./SellButton";
import Asset from "./Assets";
import Refresh from "../actions/Refresh";
import { getUpdate, RoundOf, getMarketStatus } from "../utils/utils";
import SellAction from "../actions/Sell";
import BuyAction from "../actions/Buy";

import "../styles/main.css"
import axios from "axios";
import { setInterval } from "timers";

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
		intervalId: null,
		statusInterval: null
	}
	
	componentDidMount() {
		if(sessionStorage.getItem("status") === "OPEN") {
			clearInterval(this.state.statusInterval)
		}
		let statusInterval = setInterval(() => getMarketStatus(), 10000)
		let interval = setInterval(this.update, 2000);
		this.setState({intervalId: interval, statusInterval});
	}

	componentDidUpdate(prevProps) {
		if(JSON.stringify(this.props.portfolio) !== JSON.stringify(prevProps.portfolio)) {
			this.props.portfolio.map(item => {
				axios.patch(`${process.env.REACT_APP_BACKEND_URL}/state/company`, item, {headers: {"x-auth": sessionStorage.getItem("JWT_Token")}}).then(() => {
				})
			})
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
		clearInterval(this.state.statusInterval)
	}

	update = () => {
		if(sessionStorage.getItem("status") !== "CLOSE") {
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
			})
		}	
	
	}

	render() {
		return (
			<div>
				<Asset />

				<section className="hero is-primary is-bold">
					<div className="hero-body">
						<h1 className="title has-text-centered is-uppercase">Portfolio</h1>
					</div>
				</section>
				
				<table className="table is-hoverable is-fullwidth">
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
									<td>$ {e.buyPrice}</td>
									<td>$ {e.currPrice}</td>
									<td>$ {e.shareWorth}</td>
									<td>{e.profitLoss >= 0 ? <span id="profit">$ {e.profitLoss}</span> : <span id="loss">$ {e.profitLoss}</span>}</td>
									<td><SellButton id={e._id} allValue={e}></SellButton></td>
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

