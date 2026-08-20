const { FractalScanner } = require('./fractal-scanner');

async function main() {
  console.log('🚀 Price Fractal Scanner Demo\n');

  const scanner = new FractalScanner();

  scanner.on('contractCreated', (c) => {
    console.log(`📋 Contract created: ${c.id}\n`);
  });

  scanner.on('betPlaced', ({ contractId, side, amount }) => {
    console.log(`💰 ${amount} on ${side} for ${contractId}\n`);
  });

  scanner.on('contractSettled', ({ contractId, outcome, price, fractalScore, fractalType, threshold }) => {
    console.log(`🎯 ${contractId} settled as ${outcome}!`);
    console.log(`   Price: ${price}`);
    console.log(`   Fractal Score: ${fractalScore ? fractalScore.toFixed(4) : 'N/A'}`);
    console.log(`   Type: ${fractalType}, Threshold: ${threshold}\n`);
  });

  scanner.on('payoutDistributed', ({ contractId, user, amount }) => {
    console.log(`💸 ${amount} to ${user} for ${contractId}`);
  });

  // Contract 1: Up Fractal ETH
  console.log('=== Contract 1: ETH - Up Fractal > 0.02 ===');
  const c1 = scanner.createContract({
    asset: 'ETH',
    fractalType: 'UP',
    threshold: 0.02,
    sourceUrl: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    jsonPath: 'ethereum.usd',
    duration: 5,
    maxAttempts: 3
  });

  scanner.placeBet(c1.id, 'YES', BigInt(200));
  scanner.placeBet(c1.id, 'NO', BigInt(150));

  // Contract 2: Down Fractal BTC
  console.log('\n=== Contract 2: BTC - Down Fractal > 0.015 ===');
  const c2 = scanner.createContract({
    asset: 'BTC',
    fractalType: 'DOWN',
    threshold: 0.015,
    sourceUrl: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
    jsonPath: 'bitcoin.usd',
    duration: 3,
    maxAttempts: 2
  });

  scanner.placeBet(c2.id, 'YES', BigInt(100));
  scanner.placeBet(c2.id, 'NO', BigInt(200));

  // Contract 3: Symmetrical Fractal SOL
  console.log('\n=== Contract 3: SOL - Symmetrical Fractal > 0.7 ===');
  const c3 = scanner.createContract({
    asset: 'SOL',
    fractalType: 'SYMMETRICAL',
    threshold: 0.7,
    sourceUrl: 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
    jsonPath: 'solana.usd',
    duration: 4,
    maxAttempts: 3
  });

  scanner.placeBet(c3.id, 'YES', BigInt(80));
  scanner.placeBet(c3.id, 'NO', BigInt(40));

  console.log('\n=== Settling contracts ===');
  await scanner.advanceTime(6);

  console.log('\n=== All Contracts ===');
  scanner.getContracts().forEach(c => {
    console.log(`${c.id}: ${c.status}`);
    console.log(`  YES: ${c.totalYes}, NO: ${c.totalNo}`);
    console.log(`  Outcome: ${c.outcome || 'Pending'}`);
    console.log(`  Fractal Score: ${c.fractalScore ? c.fractalScore.toFixed(4) : 'N/A'}`);
    console.log('---');
  });

  scanner.destroy();
  console.log('\n✅ Fractal Demo complete!');
}

main().catch(console.error);
