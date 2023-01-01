// These import necessary modules and set some initial variables
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
// const rateLimit = require("express-rate-limit");
const app = express();
const port = 3000;

// Routes

// Test route, visit localhost:3000 to confirm it's working
// should show 'Hello World!' in the browser
app.get("/", (req, res) => res.send("Hello World!"));

// Our Goodreads relay route!
app.get("/api/search", async (req, res) => {
	try {
		// This uses string interpolation to make our search query string
		// it pulls the posted query param and reformats it for goodreads
		const searchString = `q=${req.query.q}`;

		// It uses node-fetch to call the goodreads api, and reads the key from .env
		const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=${process.env.NYT_API_KEY}`);
        const json = await response.json();
        console.log(json)
        const results = json.response.docs
		//more info here https://www.goodreads.com/api/index#search.books
		// const xml = await response.text();

		// const json = convert.xml2json(xml, { compact: true, spaces: 2 });

		// The API returns stuff we don't care about, so we may as well strip out
		// everything except the results:
		// const results = JSON.parse(json).GoodreadsResponse.search.results;

		return res.json({
            success: true,
            results
        })
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: err.message,
		})
	}
})

// This spins up our sever and generates logs for us to use.
// Any console.log statements you use in node for debugging will show up in your
// terminal, not in the browser console!
app.listen(port, () => console.log(`Example app listening on port ${port}!`));