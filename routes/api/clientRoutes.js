import express from 'express';
import { getClient, getClients, newClient } from '../../controllers/clientController.js';

const router = express.Router();

router.route('/clientes')
    .post(newClient)
    .get(getClients);

router.route('/clientes/:client_id')
    .get(getClient)

export default router;