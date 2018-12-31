import React from "react"
import { NavLink } from "react-router-dom"
import axios from "axios"

import LogOut from "../components/LogOut"

export default class Header extends React.Component {

    state = {
        name: ""
    }
    
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/me`, {headers: {"x-auth": sessionStorage.getItem("JWT_Token")}}).then(data => {
			this.setState({name: data.data.name})
		})
    }
    
    render() {
        return (
            <div>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <span className="navbar-item"> 
                        <img src={require("../assets/favicon.png")} height="24" width="24"/>
                        </span>
                    </div>
        
                    <div className="navbar-menu">
                        <div className="navbar-start">
                            <NavLink to="/" className="navbar-item">Home</NavLink>
                            <NavLink to="/buy" className="navbar-item">Buy</NavLink>
                            <NavLink to="/view" className="navbar-item">View</NavLink>
                            <a href="http://www.isnasdaqopen.com/" className="navbar-item" target="blank">Check Market Status</a>
                        </div>
        
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <h5 className="title is-6"> <span className="icon" id="usericon"> <img src={require("../assets/avatar.png")} alt=""/> </span> <span className="has-text-weight-normal" id="name">{this.state.name}</span> </h5>
                            </div>
                            <div className="navbar-item">
                                <LogOut />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}