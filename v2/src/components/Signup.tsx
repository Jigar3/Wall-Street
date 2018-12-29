import React from "react"
import axios from "axios";

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

                this.props.history.push("/")
            })
        })
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input type="name" name="name" onChange={this.handleChange} value={this.state.name} required/>

                    <label>Email</label>
                    <input type="email" name="email" onChange={this.handleChange} value={this.state.email} required/>

                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password} required/>

                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default SignUp