class SimpleStrategy {
    constructor() {
      this.lastPrices = {};
    }
  
    decide(stockData) {
      const actions = [];
      for (const stock in stockData) {
        const currentPrice = stockData[stock];
        const lastPrice = this.lastPrices[stock];
  
        if (lastPrice) {
          const priceChange = (currentPrice - lastPrice) / lastPrice;
  
          if (priceChange <= -0.02) {
            actions.push({ type: 'buy', stock, price: currentPrice, quantity: 1 });
          } else if (priceChange >= 0.03) {
            actions.push({ type: 'sell', stock, price: currentPrice, quantity: 1 });
          }
        }
  
        this.lastPrices[stock] = currentPrice;
      }
  
      return actions;
    }
  }
  
  module.exports = SimpleStrategy;