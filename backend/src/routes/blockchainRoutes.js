import express from 'express';
import {
  getBlockchain,
  getBlockByIndex,
  validateBlockchain,
  getBlockchainStats
} from '../controllers/blockchainController.js';

const router = express.Router();

router.get('/', getBlockchain);
router.get('/block/:index', getBlockByIndex);
router.get('/validate', validateBlockchain);
router.get('/stats', getBlockchainStats);

export default router;
