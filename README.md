This is a simple trading bot simulation that uses a basic strategy to buy and sell stocks based on price movements.

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file with the following content:

INITIAL_BALANCE=10000

## Running the Application

To start the trading bot simulation, run:

npm start

## Trading Logic

The bot uses a simple strategy based on price movements:

- Buy when the stock price drops by 2% or more
- Sell when the stock price rises by 3% or more

The bot runs in continuous cycles, fetching the latest stock prices, making decisions based on the strategy, and executing trades accordingly.

## API Usage

The application uses a mock API to simulate real-time stock prices. In a real-world scenario, you would replace this with an actual stock market API.

## Performance Tracking

The bot tracks all trades made and calculates the overall profit/loss. A summary report is generated at the end of the simulation.
