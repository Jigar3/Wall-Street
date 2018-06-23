// import { IEXClient } from 'iex-api';
// import * as _fetch from 'isomorphic-fetch';

// const iex = new IEXClient(_fetch)
// iex.stockCompany('AAPL')
//   .then(company => console.log(company))

import axios from 'axios';

axios.get("https://api.iextrading.com/1.0/stock/aapl/batch?types=quote").then((data) => {
    console.log(data.data)
})