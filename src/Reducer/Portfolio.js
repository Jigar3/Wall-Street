import axios from "axios";

const portfolio = [];

const Portfolio = (state = portfolio, action) => {
  switch (action.type) {
    case "ADD":
      return state.concat(action.payLoad);

    case "DELETE":
      return state.filter(item => state.indexOf(item) !== action.payLoad);

    case "REFRESH":
      state.forEach(childState => {
        const symbol = childState.company;
        axios
          .get(
            `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote`
          )
          .then(data => {
            console.log(data.data.quote.latestPrice);
            state.concat({
              currPrice: data.data.quote.latestPrice,
              ...childState
            });
          });
      });

    default:
      return state;
  }
};

export default Portfolio;
