import React from "react"
import axios from "axios"

class Leaderboard extends React.Component {

    state = {
        gotData: false,
        leaderBoard: []
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/leaderboard`).then(data => {
            this.setState({gotData: true, leaderBoard: data.data})
        })
    }
    
    render() {
        return (
            <React.Fragment>
                { !this.state.gotData ? "Loading....." : 
                    this.state.leaderBoard.map((user, index) => (
                        <tr key={user.creator}>
                            <td> {index+1} </td>
                            <td> {user.creator_name} </td>
                            <td> {user.profitLoss} </td>
                        </tr>
                    ))
                }
            </React.Fragment>
        )
    }
}

export default Leaderboard