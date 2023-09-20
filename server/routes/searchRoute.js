import express from 'express';
import { searchByName } from '../controllers/searchController.js';

const router = express.Router();

router.get('/search', searchByName);

export default router;