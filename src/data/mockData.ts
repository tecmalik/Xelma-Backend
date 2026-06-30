import { mockDataRepository } from '../repositories/mockData.repository';

// Keep the types for backward compatibility, although they can map directly to Prisma types
export type MockPredictionRound =
  | { id: string; asset: string; mode: 'updown'; status: 'live' | 'new'; startPrice: number; poolUp: number; poolDown: number; closesAt: string; }
  | { id: string; asset: string; mode: 'precision'; status: 'live' | 'new'; startPrice: number; totalPool: number; predictionCount: number; closesAt: string; };

export type MockLeaderboardUser = {
  rank: number;
  address: string;
  totalWins: number;
  totalLosses: number;
  winStreak: number;
  xp: number;
  rankTitle: string;
};

export const mockLeaderboard: MockLeaderboardUser[] = [
  { rank: 1, address: 'GBZX...9QRA', totalWins: 42, totalLosses: 8, winStreak: 9, xp: 18400, rankTitle: 'Oracle' },
  { rank: 2, address: 'GDK4...2LXM', totalWins: 37, totalLosses: 10, winStreak: 6, xp: 15950, rankTitle: 'Market Sage' },
  { rank: 3, address: 'GAV7...8PQN', totalWins: 35, totalLosses: 13, winStreak: 4, xp: 14820, rankTitle: 'Trend Master' },
  { rank: 4, address: 'GC9M...5VTE', totalWins: 31, totalLosses: 14, winStreak: 3, xp: 13210, rankTitle: 'Signal Hunter' },
  { rank: 5, address: 'GCB2...7KDW', totalWins: 29, totalLosses: 15, winStreak: 5, xp: 12490, rankTitle: 'Pool Climber' },
  { rank: 6, address: 'GDPT...4NLA', totalWins: 26, totalLosses: 16, winStreak: 2, xp: 11160, rankTitle: 'Price Reader' },
  { rank: 7, address: 'GB7N...6XHF', totalWins: 24, totalLosses: 18, winStreak: 1, xp: 10240, rankTitle: 'Streak Keeper' },
  { rank: 8, address: 'GCR8...3MLB', totalWins: 22, totalLosses: 20, winStreak: 2, xp: 9480, rankTitle: 'Chart Scout' },
  { rank: 9, address: 'GAF5...1ZQH', totalWins: 19, totalLosses: 17, winStreak: 1, xp: 8360, rankTitle: 'Breakout Seeker' },
  { rank: 10, address: 'GDT6...8RCV', totalWins: 17, totalLosses: 19, winStreak: 0, xp: 7540, rankTitle: 'Rookie Prophet' },
];

// Async functions calling the new Prisma repository
export const getMockRounds = async (): Promise<MockPredictionRound[]> => {
  const rounds = await mockDataRepository.getRounds();
  // Map Prisma models back to the expected union type
  return rounds.map(r => {
    if (r.mode === 'updown') {
      return {
        id: r.id, asset: r.asset, mode: 'updown', status: r.status as 'live' | 'new',
        startPrice: r.startPrice, poolUp: r.poolUp!, poolDown: r.poolDown!, closesAt: r.closesAt
      };
    }
    return {
      id: r.id, asset: r.asset, mode: 'precision', status: r.status as 'live' | 'new',
      startPrice: r.startPrice, totalPool: r.totalPool!, predictionCount: r.predictionCount!, closesAt: r.closesAt
    };
  });
};

export const getMockLeaderboard = async (): Promise<MockLeaderboardUser[]> => {
  return mockDataRepository.getLeaderboard();
};

export const getMockData = async () => {
  const platformStats = await mockDataRepository.getPlatformStats();
  const leaderboard = await getMockLeaderboard();

  return {
    prices: mockData.prices,
    platformStats: platformStats ? {
      totalRounds: platformStats.totalRounds,
      totalVxlmDistributed: platformStats.totalVxlmDistributed,
      activePlayers: platformStats.activePlayers,
      totalBetsPlaced: platformStats.totalBetsPlaced,
    } : {
      totalRounds: 1247,
      totalVxlmDistributed: 4200000,
      activePlayers: 893,
      totalBetsPlaced: 8432,
    },
    leaderboard,
  };
};

// Synchronous prices array remains in memory because price polling relies on it synchronously if DB fallback is invoked
export const mockData = {
  prices: [
    { id: 'bitcoin', symbol: 'btc', price: 60000 },
    { id: 'ethereum', symbol: 'eth', price: 3000 },
  ],
};

/**
 * Static mock constants used as a fallback by the stats service when the
 * database is empty or unreachable.
 */
export const MOCK_PLATFORM_STATS = {
  totalRounds: 0,
  totalUsers: 0,
  totalBets: 0,
} as const;

// ---------------------------------------------------------------------------
// In-memory leaderboard data (used by InMemoryLeaderboardRepository)
// ---------------------------------------------------------------------------

export const mockLeaderboard: MockLeaderboardUser[] = [
  { rank: 1,  address: "GABCDEF12345678901234567890123456789012345678901234", totalWins: 142, totalLosses: 58,  winStreak: 12, xp: 14200, rankTitle: "Diamond"   },
  { rank: 2,  address: "GBCDEF123456789012345678901234567890123456789012345", totalWins: 98,  totalLosses: 72,  winStreak: 8,  xp: 9800,  rankTitle: "Platinum"  },
  { rank: 3,  address: "GCDEF1234567890123456789012345678901234567890123456", totalWins: 85,  totalLosses: 65,  winStreak: 6,  xp: 8500,  rankTitle: "Gold"     },
  { rank: 4,  address: "GDEF12345678901234567890123456789012345678901234567", totalWins: 72,  totalLosses: 48,  winStreak: 5,  xp: 7200,  rankTitle: "Gold"     },
  { rank: 5,  address: "GEF123456789012345678901234567890123456789012345678", totalWins: 61,  totalLosses: 39,  winStreak: 7,  xp: 6100,  rankTitle: "Silver"   },
  { rank: 6,  address: "GF1234567890123456789012345678901234567890123456789", totalWins: 54,  totalLosses: 46,  winStreak: 4,  xp: 5400,  rankTitle: "Silver"   },
  { rank: 7,  address: "G12345678901234567890123456789012345678901234567890", totalWins: 42,  totalLosses: 58,  winStreak: 3,  xp: 4200,  rankTitle: "Bronze"   },
  { rank: 8,  address: "GHIJK123456789012345678901234567890123456789012345", totalWins: 33,  totalLosses: 67,  winStreak: 2,  xp: 3300,  rankTitle: "Bronze"   },
  { rank: 9,  address: "GIJKL1234567890123456789012345678901234567890123456", totalWins: 21,  totalLosses: 79,  winStreak: 3,  xp: 2100,  rankTitle: "Bronze"   },
  { rank: 10, address: "GJKLM12345678901234567890123456789012345678901234567", totalWins: 12,  totalLosses: 88,  winStreak: 1,  xp: 1200,  rankTitle: "Rookie"   },
];

// ---------------------------------------------------------------------------
// In-memory bet history types
// ---------------------------------------------------------------------------

export type MockBetHistoryItem = {
  roundId: string;
  asset: string;
  mode: string;
  amount: string;
  side: string | null;
  predictedPrice: unknown;
  result: "PENDING" | "WIN" | "LOSS";
  payout: string | null;
  timestamp: Date;
  roundStatus: string;
};

// ---------------------------------------------------------------------------
// In-memory bet history generator
// ---------------------------------------------------------------------------

export function getMockBetHistory(address: string): MockBetHistoryItem[] {
  if (!address) return [];

  const rounds = [
    { id: "round-001", mode: "UP_DOWN",   status: "RESOLVED" },
    { id: "round-002", mode: "LEGENDS",   status: "RESOLVED" },
    { id: "round-003", mode: "UP_DOWN",   status: "RESOLVED" },
    { id: "round-004", mode: "LEGENDS",   status: "RESOLVED" },
    { id: "round-005", mode: "UP_DOWN",   status: "ACTIVE"   },
    { id: "round-006", mode: "UP_DOWN",   status: "RESOLVED" },
    { id: "round-007", mode: "LEGENDS",   status: "RESOLVED" },
    { id: "round-008", mode: "UP_DOWN",   status: "RESOLVED" },
    { id: "round-009", mode: "LEGENDS",   status: "RESOLVED" },
    { id: "round-010", mode: "UP_DOWN",   status: "RESOLVED" },
    { id: "round-011", mode: "LEGENDS",   status: "ACTIVE"   },
    { id: "round-012", mode: "UP_DOWN",   status: "RESOLVED" },
    { id: "round-013", mode: "LEGENDS",   status: "RESOLVED" },
    { id: "round-014", mode: "UP_DOWN",   status: "RESOLVED" },
    { id: "round-015", mode: "LEGENDS",   status: "RESOLVED" },
    { id: "round-016", mode: "UP_DOWN",   status: "PENDING"  },
    { id: "round-017", mode: "UP_DOWN",   status: "RESOLVED" },
    { id: "round-018", mode: "LEGENDS",   status: "RESOLVED" },
    { id: "round-019", mode: "UP_DOWN",   status: "RESOLVED" },
    { id: "round-020", mode: "LEGENDS",   status: "RESOLVED" },
    { id: "round-021", mode: "UP_DOWN",   status: "ACTIVE"   },
    { id: "round-022", mode: "LEGENDS",   status: "RESOLVED" },
    { id: "round-023", mode: "UP_DOWN",   status: "RESOLVED" },
    { id: "round-024", mode: "LEGENDS",   status: "RESOLVED" },
    { id: "round-025", mode: "UP_DOWN",   status: "RESOLVED" },
  ];

  const seeds = [
    { side: "UP",     amount: "50.00000000",  won: true,  payout: "95.00000000",   predictedPrice: null },
    { side: "DOWN",   amount: "25.00000000",  won: false, payout: null,            predictedPrice: null },
    { side: "UP",     amount: "100.00000000", won: true,  payout: "185.00000000",  predictedPrice: null },
    { side: null,     amount: "30.00000000",  won: true,  payout: "120.00000000",  predictedPrice: { min: 0.10, max: 0.12 } as const },
    { side: null,     amount: "75.00000000",  won: false, payout: null,            predictedPrice: { min: 0.12, max: 0.14 } as const },
    { side: "DOWN",   amount: "40.00000000",  won: true,  payout: "76.00000000",   predictedPrice: null },
    { side: null,     amount: "60.00000000",  won: true,  payout: "180.00000000",  predictedPrice: { min: 0.14, max: 0.16 } as const },
    { side: "UP",     amount: "90.00000000",  won: false, payout: null,            predictedPrice: null },
    { side: null,     amount: "45.00000000",  won: false, payout: null,            predictedPrice: { min: 0.08, max: 0.10 } as const },
    { side: "UP",     amount: "120.00000000", won: true,  payout: "228.00000000",  predictedPrice: null },
    { side: null,     amount: "55.00000000",  won: null,  payout: null,            predictedPrice: { min: 0.16, max: 0.18 } as const },
    { side: "DOWN",   amount: "35.00000000",  won: false, payout: null,            predictedPrice: null },
    { side: null,     amount: "80.00000000",  won: true,  payout: "240.00000000",  predictedPrice: { min: 0.10, max: 0.12 } as const },
    { side: "UP",     amount: "65.00000000",  won: true,  payout: "123.50000000",  predictedPrice: null },
    { side: null,     amount: "70.00000000",  won: false, payout: null,            predictedPrice: { min: 0.12, max: 0.14 } as const },
    { side: "UP",     amount: "20.00000000",  won: null,  payout: null,            predictedPrice: null },
    { side: "DOWN",   amount: "110.00000000", won: false, payout: null,            predictedPrice: null },
    { side: null,     amount: "95.00000000",  won: true,  payout: "285.00000000",  predictedPrice: { min: 0.14, max: 0.16 } as const },
    { side: "UP",     amount: "150.00000000", won: true,  payout: "285.00000000",  predictedPrice: null },
    { side: null,     amount: "40.00000000",  won: false, payout: null,            predictedPrice: { min: 0.08, max: 0.10 } as const },
    { side: "DOWN",   amount: "85.00000000",  won: null,  payout: null,            predictedPrice: null },
    { side: null,     amount: "30.00000000",  won: true,  payout: "90.00000000",   predictedPrice: { min: 0.10, max: 0.12 } as const },
    { side: "UP",     amount: "200.00000000", won: false, payout: null,            predictedPrice: null },
    { side: null,     amount: "50.00000000",  won: true,  payout: "150.00000000",  predictedPrice: { min: 0.12, max: 0.14 } as const },
    { side: "DOWN",   amount: "25.00000000",  won: true,  payout: "47.50000000",   predictedPrice: null },
  ];

  const baseDate = new Date("2026-06-01T12:00:00.000Z");

  return rounds.map((round, i) => {
    const seed = seeds[i % seeds.length];
    const timestamp = new Date(baseDate.getTime() - i * 3600000);
    return {
      roundId: round.id,
      asset: "XLM",
      mode: round.mode,
      amount: seed.amount,
      side: seed.side,
      predictedPrice: seed.predictedPrice,
      result: seed.won === null ? "PENDING" : seed.won ? "WIN" : "LOSS",
      payout: seed.payout,
      timestamp,
      roundStatus: round.status,
    };
  });
}