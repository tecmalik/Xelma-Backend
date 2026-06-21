import { Router } from 'express';
import { mockLeaderboard } from '../data/mockData';

const router = Router();

router.get('/', (_req, res) => {
  res.json(mockLeaderboard);
});

export default router;
