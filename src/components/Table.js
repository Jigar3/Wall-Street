import React from "react";
import { connect } from 'react-redux';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class Table extends React.Component {

  render() {
    console.log("Props", this.props.data)
    return (
      <div>
        <ReactTable
          filterable
          noDataText="Buy Some Shares to see them"
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          data={this.props.data}
          columns={[
            {
              Header: "Portfolio",
              columns: [
                {
                  Header: "Company Name",
                  accessor: "company",
                  Filter: ({filter, onChange}) => (
                    <input type='text'
                          placeholder="Search Company"
                          value={filter ? filter.value : ''}
                          onChange={event => onChange(event.target.value)}
                    />
                  )
                },
                {
                  Header: "Quantity",
                  accessor: "quantity"
                },
                {
                  Header: "Buy Price",
                  accessor: "buyPrice"
                },
                {
                  Header: "Current Price",
                  accessor: "currPrice"
                },
                {
                  Header: "Share Worth",
                  accessor: "shareWorth"
                },
                {
                  Header: "Profit/Loss",
                  accessor: "profitLoss",
                  id: "over",
                  Cell: ({ value }) => (value >= 0 ? value : value),
                  filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                      return true;
                    }
                    if (filter.value === "Profit") {
                      return row[filter.id] >= 0;
                    }
                    return row[filter.id] < 0;
                  },
                  Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "all"}
                    >
                      <option value="all">Show All</option>
                      <option value="Profit">Profit</option>
                      <option value="false">Loss</option>
                    </select>
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    data: state
  }
}


export default connect(mapStatetoProps)(Table);