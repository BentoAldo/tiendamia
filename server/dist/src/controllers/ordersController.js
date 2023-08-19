"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTravelingOrders = exports.getApprovedOrders = exports.getOrderById = exports.getAllOrders = void 0;
const prismaInstance_1 = require("../../prisma/prismaInstance");
function getAllOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allOrders = yield prismaInstance_1.prisma.order.findMany({
                include: { items: true, client: true }
            });
            res.json(allOrders);
        }
        catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ error: "Error al obtener todos los pedidos." });
        }
    });
}
exports.getAllOrders = getAllOrders;
function getOrderById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderId = parseInt(req.params.id, 10);
        try {
            const order = yield prismaInstance_1.prisma.order.findUnique({
                where: {
                    id: orderId
                },
                include: {
                    items: true,
                    client: true
                },
            });
            if (!order) {
                return res.status(404).json({ error: "Order not found." });
            }
            res.json(order);
        }
        catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ error: "Error al obtener el pedido." });
        }
    });
}
exports.getOrderById = getOrderById;
function getApprovedOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const now = new Date();
            const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000; // 2 días en milisegundos
            const twoDaysFromNow = new Date(now.getTime() + twoDaysInMillis);
            const approvedOrders = yield prismaInstance_1.prisma.order.findMany({
                include: { items: true, client: true },
                where: {
                    status: 'Approve',
                    shippingPromise: {
                        gte: now,
                        lte: twoDaysFromNow
                    }
                }
            });
            res.json(approvedOrders);
        }
        catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ error: "Error al obtener pedidos aprobados." });
        }
    });
}
exports.getApprovedOrders = getApprovedOrders;
function getTravelingOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fromDate = new Date(req.query.fromDate);
            const toDate = new Date(req.query.toDate);
            const travelingOrders = yield prismaInstance_1.prisma.order.findMany({
                include: { items: true, client: true },
                where: {
                    status: 'Traveling',
                    createDate: {
                        gte: fromDate,
                        lte: toDate
                    }
                }
            });
            res.json(travelingOrders);
        }
        catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ error: "Error al obtener pedidos en tránsito." });
        }
    });
}
exports.getTravelingOrders = getTravelingOrders;
