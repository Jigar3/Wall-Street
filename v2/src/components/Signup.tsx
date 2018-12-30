import React from "react"
import axios from "axios";
import { NavLink } from "react-router-dom";

interface State {
    email: String,
    name: String,
    password: String
}

class SignUp extends React.Component<any, State> {

    state = {
        email: "",
        password: "",
        name: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: [e.target.value]
        } as Pick<State, 'email' | 'password'>)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {email: this.state.email[0], password: this.state.password[0], name: this.state.name[0]}).then(data => {

            axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {email: this.state.email[0], password: this.state.password[0]}).then(data => {
                localStorage.setItem("JWT_Token", data.headers["x-auth"])
                localStorage.setItem("User_ID", data.data._id)

                axios.post(`${process.env.REACT_APP_BACKEND_URL}/state/money`, {money: 10000}, {headers: {"x-auth": localStorage.getItem("JWT_Token")}})

                window.location.href = "/"
            })
        })
    }

    render() {
        return(
            <div className="container" id="signup">

                <div id="login_signup">
                    <h4 className="title is-uppercase has-text-primary">Sign Up</h4>
                    <h4 className="title has-text-weight-normal is-uppercase has-text-primary has-text-right"><NavLink to="/login">Log In</NavLink></h4>                  
                </div> 

                <form onSubmit={this.handleSubmit}>

                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" placeholder="Full Name" type="name" name="name" onChange={this.handleChange} value={this.state.name} required/>
                            <span className="icon is-small is-left">
                                <img src={require("../assets/street-name.png")} alt=""/>
                            </span>
                        </p>
                    </div>

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
                    </div>
                    
                    <div className="field">
                        <div className="control">
                            <button className="button is-primary is-fullwidth">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp