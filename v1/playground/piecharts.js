import React from 'react';
import ReactDOM from 'react-dom';
import {PieChart, Pie, Sector, Cell} from 'recharts';
const createReactClass = require('create-react-class');

const data = [{name: 'Infosys', value: 10000}, {name: 'HDFC', value: 15000},
                  {name: 'Reliance', value: 20000}, {name: 'Money', value: 55000}];

const colors = ['#D0ECE7', '#A2D9CE', '#7DCEA0', '#27AE60'];
                   
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
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`₹ ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class TwoLevelPieChart extends React.Component {
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
          data={data} 
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

ReactDOM.render(
  <TwoLevelPieChart />,
  document.getElementById('app')
);
