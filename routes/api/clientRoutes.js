import express from 'express';
import { newClient } from '../../controllers/clientController.js';

const router = express.Router();

router.route('/clientes')
    .post(newClient);

export default router;