import React from "react";
import axios from "axios";

import { history } from "../router/Approuter";

export default class LogOut extends React.Component<any> {

    handleClick = () => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/logout`, {headers: {
            "x-auth": localStorage.getItem("JWT_Token")
        }}).then(() => {
            localStorage.removeItem("JWT_Token")
            localStorage.removeItem("User_ID")
            history.push("/login")
        })
    }

    render() {
        return (
            <button onClick={this.handleClick} className="button is-light">
                Log Out
            </button>
        )
    }
}