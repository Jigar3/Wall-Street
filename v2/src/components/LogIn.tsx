import React from "react"
import axios from "axios";

import { NavLink } from "react-router-dom"
import { history } from "../router/Approuter";

interface State {
    email: String,
    password: String,
    error: String,
    loading: Boolean
}

class LogIn extends React.Component<any, State> {

    state = {
        email: "",
        password: "",
        error: undefined,
        loading: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: [e.target.value]
        } as Pick<State, 'email' | 'password'>)
        this.setState({error: ""})
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.setState({loading: true})
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {email: this.state.email[0], password: this.state.password[0]}).then(data => {
            localStorage.setItem("JWT_Token", data.headers["x-auth"])
            localStorage.setItem("User_ID", data.data._id)
            // history.push("/")
            window.location.href = "/"
        }).catch((err) => {
            console.log(err)
            this.setState({error: "Email & Password didn't match", loading: false})
        })
    }

    render() {
        return(
            <div className="container" id="login">

                <div id="login_signup">
                    <h4 className="title is-uppercase has-text-primary">Log In</h4>
                    <h4 className="title is-uppercase has-text-primary has-text-right has-text-weight-normal"><NavLink to="/signup">Sign Up</NavLink></h4>
                </div>
                <form onSubmit={this.handleSubmit}>
            
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" placeholder="Email" type="email" name="email" onChange={this.handleChange} value={this.state.email} required/>
                            <span className="icon is-small is-left">
                                <img src={require("../assets/mail.png")} alt=""/>
                            </span>
                        </p>
                    </div>

                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" placeholder="Password" type="password" name="password" onChange={this.handleChange} value={this.state.password} required/>
                            <span className="icon is-small is-left">
                                <img src={require("../assets/padlock.png")} alt=""/>
                            </span>
                        </p>
                        <p className="help is-danger"> {this.state.error} </p>
                    </div>
                    
                    <div className="field">
                        <div className="control">
                            {this.state.loading ? <button className="button is-primary is-loading is-fullwidth" >Loading</button> : <button className="button is-primary is-fullwidth">Submit</button>}
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}

export default LogIn