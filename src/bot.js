const { getMockStockData } = require('./api/mockStockAPI');
const SimpleStrategy = require('./strategies/simpleStrategy');
const logger = require('./utils/logger');

class TradingBot {
  constructor({ initialBalance }) {
    this.balance = parseFloat(initialBalance);
    this.strategy = new SimpleStrategy();
    this.positions = {};
    this.trades = [];
  }

  async start() {
    logger.info('Trading bot started');
    this.interval = setInterval(async () => {
      try {
        const stockData = await this.fetchStockData();
        this.executeStrategy(stockData);
      } catch (error) {
        logger.error('Error in trading cycle:', error);
      }
    }, 5000); // Run every 5 seconds
  }

  async fetchStockData() {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return getMockStockData();
  }

  executeStrategy(stockData) {
    const actions = this.strategy.decide(stockData);
    actions.forEach(action => {
      if (action.type === 'buy') {
        this.buy(action.stock, action.price, action.quantity);
      } else if (action.type === 'sell') {
        this.sell(action.stock, action.price, action.quantity);
      }
    });
  }

  buy(stock, price, quantity) {
    const cost = price * quantity;
    if (this.balance >= cost) {
      this.balance -= cost;
      this.positions[stock] = (this.positions[stock] || 0) + quantity;
      this.trades.push({ type: 'buy', stock, price, quantity, timestamp: new Date() });
      logger.info(`Bought ${quantity} shares of ${stock} at $${price}`);
    } else {
      logger.warn(`Insufficient balance to buy ${quantity} shares of ${stock}`);
    }
  }

  sell(stock, price, quantity) {
    if (this.positions[stock] >= quantity) {
      const revenue = price * quantity;
      this.balance += revenue;
      this.positions[stock] -= quantity;
      this.trades.push({ type: 'sell', stock, price, quantity, timestamp: new Date() });
      logger.info(`Sold ${quantity} shares of ${stock} at $${price}`);
    } else {
      logger.warn(`Insufficient shares to sell ${quantity} shares of ${stock}`);
    }
  }

  generateReport() {
    let totalProfit = 0;
    for (const trade of this.trades) {
      if (trade.type === 'sell') {
        totalProfit += trade.price * trade.quantity;
      } else {
        totalProfit -= trade.price * trade.quantity;
      }
    }

    logger.info('=== Trading Bot Report ===');
    logger.info(`Total trades: ${this.trades.length}`);
    logger.info(`Final balance: $${this.balance.toFixed(2)}`);
    logger.info(`Total profit/loss: $${totalProfit.toFixed(2)}`);
    logger.info('Current positions:');
    for (const [stock, quantity] of Object.entries(this.positions)) {
      logger.info(`  ${stock}: ${quantity} shares`);
    }
    logger.info('=========================');
  }

  stop() {
    clearInterval(this.interval);
    this.generateReport();
    logger.info('Trading bot stopped');
  }
}

module.exports = TradingBot;