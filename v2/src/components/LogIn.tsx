import React from "react"
import axios from "axios";

import { NavLink } from "react-router-dom"
import { history } from "../router/Approuter";

interface State {
    email: String,
    password: String
}

class LogIn extends React.Component<any, State> {

    state = {
        email: "",
        password: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: [e.target.value]
        } as Pick<State, 'email' | 'password'>)
    }

    handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {email: this.state.email[0], password: this.state.password[0]}).then(data => {
            localStorage.setItem("JWT_Token", data.headers["x-auth"])
            localStorage.setItem("User_ID", data.data._id)
            history.push("/")
        })
    }

    render() {
        return(
            <div>

                <NavLink to="/signup">
                    Sign Up
                </NavLink>
                <form onSubmit={this.handleSubmit}>
                    <label>Email</label>
                    <input type="email" name="email" onChange={this.handleChange} value={this.state.email} required/>

                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password} required/>

                    <button>Submit</button>
                </form>

                <p>Sign Up</p>
            </div>
        )
    }
}

export default LogIn