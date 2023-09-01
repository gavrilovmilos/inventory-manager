import { getHealth } from '../service/healthService';

const express = require('express');
const router = express.Router();

router.get('/', getHealth);

export const healthRoutes = router;
