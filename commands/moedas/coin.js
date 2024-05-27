const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://solscan.io/token/sfYDFZJguyF4YLZjje7qwwh41NRymFfZ3QXZbVm7Eyg';

axios.get(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        // Find the div with class "Market Overview"
        const marketOverviewDiv = $('div:contains("Market Overview")');

        // Find the parent div containing "Market Overview"
        const parentDiv = marketOverviewDiv.parent();

        // Output the HTML content of the parent div
        if (parentDiv.length > 0) {
            console.log('Parent div containing "Market Overview":');
            console.log(parentDiv.html());
        } else {
            console.log('No parent div found containing "Market Overview".');
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
