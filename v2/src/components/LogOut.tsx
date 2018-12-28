import React from "react";
import axios from "axios";

export default class LogOut extends React.Component<any> {

    handleClick = () => {
        axios.delete("http://localhost:3001/users/logout", {headers: {
            "x-auth": localStorage.getItem("JWT_Token")
        }}).then(() => {
            localStorage.removeItem("JWT_Token")
            this.props.history.push("/signup")
        })
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Log Out
            </button>
        )
    }
}