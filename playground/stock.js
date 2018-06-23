const axios = require('axios');
const cheerio = require('cheerio');

axios.get("https://in.finance.yahoo.com/quote/HDFCBANK.NS/").then((data) => {
    const page = (data.data);
    const $ = cheerio.load(page);

    const price = $('span').attr('data-reactid', '35');
    console.log(price);
})