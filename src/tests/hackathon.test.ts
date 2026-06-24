import test from 'node:test';
import assert from 'node:assert';
import { getMockRounds, mockLeaderboard } from '../data/mockData';

test('getMockRounds returns exactly 3 rounds with correct assets and dynamical future timestamps', () => {
  const rounds = getMockRounds();
  
  // Verify length
  assert.strictEqual(rounds.length, 3);
  
  // Verify assets and modes
  assert.strictEqual(rounds[0].id, 'btc-updown-live');
  assert.strictEqual(rounds[0].asset, 'BTC');
  assert.strictEqual(rounds[0].mode, 'updown');
  assert.strictEqual(rounds[0].status, 'live');
  assert.strictEqual(rounds[0].startPrice, 67420);
  
  assert.strictEqual(rounds[1].id, 'eth-precision-live');
  assert.strictEqual(rounds[1].asset, 'ETH');
  assert.strictEqual(rounds[1].mode, 'precision');
  assert.strictEqual(rounds[1].status, 'live');
  assert.strictEqual(rounds[1].startPrice, 3241);
  
  assert.strictEqual(rounds[2].id, 'xlm-updown-new');
  assert.strictEqual(rounds[2].asset, 'XLM');
  assert.strictEqual(rounds[2].mode, 'updown');
  assert.strictEqual(rounds[2].status, 'new');
  assert.strictEqual(rounds[2].startPrice, 0.2891);

  // Verify dynamic future timestamps
  const now = Date.now();
  rounds.forEach((round) => {
    const closesAtTime = new Date(round.closesAt).getTime();
    assert.ok(closesAtTime > now, `closesAt (${round.closesAt}) should be in the future relative to ${new Date(now).toISOString()}`);
  });
});

test('mockLeaderboard contains exactly 10 users sorted by rank with valid Stellar-like addresses', () => {
  assert.strictEqual(mockLeaderboard.length, 10);
  
  let previousRank = 0;
  mockLeaderboard.forEach((user) => {
    // Ranks should be 1, 2, 3, etc. and increasing
    assert.ok(user.rank > previousRank, `user rank (${user.rank}) should be higher than previous (${previousRank})`);
    previousRank = user.rank;
    
    // Address check: must start with 'G' and have standard length, or at least be a string starting with G
    assert.strictEqual(typeof user.address, 'string');
    assert.ok(user.address.startsWith('G'), `address (${user.address}) must start with G`);
    
    // Required fields check
    assert.strictEqual(typeof user.totalWins, 'number');
    assert.strictEqual(typeof user.totalLosses, 'number');
    assert.strictEqual(typeof user.winStreak, 'number');
    assert.strictEqual(typeof user.xp, 'number');
    assert.strictEqual(typeof user.rankTitle, 'string');
  });
});
