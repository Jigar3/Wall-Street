import React from "react"
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label} from "recharts"
import axios from "axios"
import { RoundOf } from "../utils/utils"
import { spawn } from "child_process";

interface PassedProps {
    data: any
}

class StockAreaChart extends React.Component<PassedProps> {

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div id="chart">
                <AreaChart width={730} height={300} data={this.props.data} margin={{top: 30, right: 30, left: 30, bottom: 30}} >
                    <CartesianGrid horizontal={false} vertical={false} />
                    <XAxis tick={{fontSize: 12, textAlign: "right"}} dataKey='date'>
                        <Label value="Date" position="insideBottom" offset={-15} />
                    </XAxis>
                    <YAxis tick={{fontSize: 12}} label={{ value: 'Price (in USD)', angle: -90, position: 'insideLeft' }}/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='price' stroke='black' fill='#00D1B2' />
                </AreaChart>
            </div>
        )
    }
}

export default StockAreaChart