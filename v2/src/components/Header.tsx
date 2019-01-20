import React from "react"
import { NavLink } from "react-router-dom"

import LogOut from "../components/LogOut"
import { getMarketStatus, setUserName } from "../utils/utils"
import LiveClock from "../components/clock";


export default class Header extends React.Component {

    componentDidMount() {
        getMarketStatus()
        setUserName()
        setTimeout(() => {
            this.forceUpdate()
        }, 2000);
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
                            <NavLink to="/leaderboard" className="navbar-item">Leaderboard</NavLink>
                            <a href="https://zerodha.com/varsity/" className="navbar-item" target="_blank">Learn About Investing</a>
                                <div className="navbar-item">
                                    <a className="title is-6" href="https://github.com/Jigar3/Wall-Street" target="_blank"> 
                                        <span className="icon" id="usericon"> 
                                            <img src={require("../assets/github-logo.png")} alt=""/> 
                                        </span> 
                                        <span className="has-text-weight-normal" id="name">
                                            Github
                                        </span> 
                                    </a>
                                </div>
                        </div>
        
                        <div className="navbar-end">
                            <div className="navbar-item" id="clock">
                                <LiveClock />
                            </div>                                                                                                     
                            <div className="navbar-item">
                                <a href="http://isnasdaqopen.com" target="_blank" id="status_label">Market Status:</a> 
                                    {sessionStorage.getItem("status") === "CLOSE" 
                                    ? <span id="close">CLOSED</span> 
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

                {/* <a id="github" href="https://github.com/Jigar3/Wall-Street" target="_blank"> <img src={require("../assets/github-logo.png")} alt=""/> View Me on Github</a> */}
            </div>
        )
    }
}
