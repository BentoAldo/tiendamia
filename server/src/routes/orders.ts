import express from 'express';
import {
    getAllOrders,
    getApprovedOrders, getOrderById,
    getTravelingOrders
} from '../controllers/ordersController';

const router = express.Router();

router.get('/orders/all', getAllOrders);

router.get('/orders/approved', getApprovedOrders);

router.get('/orders/traveling', getTravelingOrders);

router.get('/orders/:id', getOrderById);

export default router;
