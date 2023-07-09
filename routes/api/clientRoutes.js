import express from 'express';
import { deleteClient, getClientById, getClients, newClient, updateClient } from '../../controllers/clientController.js';

const router = express.Router();

router.route('/clientes')
    .post(newClient)
    .get(getClients);

router.route('/clientes/:client_id')
    .get(getClientById)
    .put(updateClient)
    .delete(deleteClient);

export default router;