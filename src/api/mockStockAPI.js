const stocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];

function generateRandomPrice(min, max) {
  return Math.random() * (max - min) + min;
}

function getMockStockData() {
  const stockData = {};
  for (const stock of stocks) {
    stockData[stock] = generateRandomPrice(100, 1000);
  }
  return stockData;
}

module.exports = { getMockStockData };