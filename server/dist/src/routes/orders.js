"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordersController_1 = require("../controllers/ordersController");
const router = express_1.default.Router();
router.get('/orders/all', ordersController_1.getAllOrders);
router.get('/orders/approved', ordersController_1.getApprovedOrders);
router.get('/orders/traveling', ordersController_1.getTravelingOrders);
router.get('/orders/:id', ordersController_1.getOrderById);
exports.default = router;
