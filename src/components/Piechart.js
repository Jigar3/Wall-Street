import React from 'react';
import {PieChart, Pie, Sector, Cell} from 'recharts';
import { connect } from 'react-redux';
const as = require('as-type');

const colors = ['#D0ECE7', '#A2D9CE', '#7DCEA0', '#27AE60'];
const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
                   
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"black"} fontSize={30} fontFamily="helvetica">{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`$ ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class CustomPieChart extends React.Component {
	state = {
    activeIndex: 0,
  }

  onPieEnter = (data, index) => {
    this.setState(() => ({
      activeIndex: index
    }));
  }

	render () {
  	return (
    	<PieChart width={1600} height={800}>
        <Pie 
            dataKey="value"
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape} 
            data={this.props.name} 
            cx={900} 
            cy={400} 
            innerRadius={120}
            outerRadius={180} 
            fill="lightblue"
            onMouseEnter={this.onPieEnter}
        >
        {
          data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]}/>
          ))
        }
        </Pie>
       </PieChart>
    );
  }
}

const mapStateToProps = (state) => {
    let companyDetails = []
    state.portfolio.map((child) => {
        companyDetails.push({
            name: child.company,
            value: parseFloat(child.shareWorth)
        })
    })
    companyDetails.push({
      name: "Money",
      value: as.float(state.money.money)
    })
    return {
        name : companyDetails
    }
}

export default connect(mapStateToProps)(CustomPieChart);