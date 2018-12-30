import React from "react"
import { NavLink } from "react-router-dom"

import LogOut from "../components/LogOut"

export default () => (
    <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a href="" className="navbar-item"> 
                <img src={require("../assets/favicon.png")} height="24" width="24"/>
                </a>
            </div>

            <div className="navbar-menu">
                <div className="navbar-start">
                    <NavLink to="/" className="navbar-item">Home</NavLink>
                    <NavLink to="/buy" className="navbar-item">Buy</NavLink>
                    <NavLink to="/view" className="navbar-item">View</NavLink>
                    <a href="http://www.isnasdaqopen.com/" className="navbar-item">Check Market Status</a>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a href="" className="button is-primary"><strong>Sign Up</strong></a>
                            {/* <a href="" className="button is-light">Log In</a> */}
                            <LogOut />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
)