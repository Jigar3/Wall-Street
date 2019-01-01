import React from "react"
import { NavLink } from "react-router-dom"

import LogOut from "../components/LogOut"
import { getMarketStatus, setUserName } from "../utils/utils"

export default class Header extends React.Component {

    componentDidMount() {
        getMarketStatus()
        setUserName()
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
                            <a href="https://zerodha.com/varsity/" className="navbar-item" target="_blank">Learn About Investing</a>
                        </div>
        
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <a href="http://isnasdaqopen.com" target="_blank" id="status_label">Market Status:</a> 
                                    {sessionStorage.getItem("status") === "US Market Closed" 
                                    ? <span id="close">CLOSE</span> 
                                    : <span id="open">LIVE</span> }
                            </div>
                            <div className="navbar-item">
                                <h5 className="title is-6"> 
                                    <span className="icon" id="usericon"> 
                                        <img src={require("../assets/avatar.png")} alt=""/> 
                                    </span> 
                                    <span className="has-text-weight-normal" id="name">
                                        {sessionStorage.getItem("name")}
                                    </span> 
                                </h5>
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