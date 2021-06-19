const express = require("express");
const axios = require('axios');

const PORT = process.env.PORT || 8000;

const app = express();

app.get("/lookup", async (req, res) => {
  const { domain } = req.query;
  try {
    const whoisResponse = await axios.get(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${process.env.WHOIS_API_KEY}&domainName=${domain}&outputFormat=JSON`);
    console.log(whoisResponse.data);
    res.json({ data: whoisResponse.data });
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});