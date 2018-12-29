import React from "react";
import axios from "axios";

export default class LogOut extends React.Component<any> {

    handleClick = () => {
        axios.delete("http://localhost:3001/users/logout", {headers: {
            "x-auth": localStorage.getItem("JWT_Token")
        }}).then(() => {
            localStorage.removeItem("JWT_Token")
            localStorage.removeItem("User_ID")
            this.props.history.push("/login")
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