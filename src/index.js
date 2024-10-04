require('dotenv').config();
const TradingBot = require('./bot');

const bot = new TradingBot({
  initialBalance: process.env.INITIAL_BALANCE,
  apiEndpoint: process.env.API_ENDPOINT,
});

bot.start();