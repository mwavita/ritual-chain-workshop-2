# Price Fractal Scanner

A self-resolving prediction market that detects **self-similar price fractals**.

## Distinctive Features

- **Fractal Detection**: Identifies up, down, and symmetrical fractal patterns
- **Three Fractal Types**: Up, Down, and Symmetrical
- **Self-Similar Pattern Analysis**: Tracks repeating price structures
- **Threshold-Based Detection**: Configurable fractal thresholds

## How Fractal Detection Works

1. Each contract tracks price movements over time
2. Fractal scores are calculated from self-similar patterns
3. Up: score > threshold, Down: score > threshold, Symmetrical: score > threshold
4. Contracts settle based on the detected fractal pattern

## Contracts

- ETH - Up Fractal > 0.02
- BTC - Down Fractal > 0.015
- SOL - Symmetrical Fractal > 0.7

## Installation

npm install
npm start

## License

MIT
