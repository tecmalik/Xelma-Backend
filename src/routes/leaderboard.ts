import { Router } from 'express';
import { mockLeaderboard } from '../data/mockData';

const router = Router();

/**
 * @openapi
 * /api/leaderboard:
 *   get:
 *     summary: Mock leaderboard rankings
 *     tags:
 *       - leaderboard
 *     responses:
 *       200:
 *         description: Top players by rank
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', (_req, res) => {
  res.json(mockLeaderboard);
});

export default router;
