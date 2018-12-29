import React from "react"
import axios from "axios";

interface State {
    email: String,
    password: String
}

class Signup extends React.Component<any, State> {

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

        axios.post("http://localhost:3001/users/signup", {email: this.state.email[0], password: this.state.password[0]}).then(data => {
            axios.post("http://localhost:3001/users/login", {email: this.state.email[0], password: this.state.password[0]}).then(data => {
                localStorage.setItem("JWT_Token", data.headers["x-auth"])
                localStorage.setItem("User_ID", data.data._id)
                this.props.history.push("/")
            })
        })
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
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

export default Signup