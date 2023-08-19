import { Request, Response } from 'express';
import { prisma } from '../../prisma/prismaInstance';

export async function getAllOrders(req: Request, res: Response) {
    try {
        const allOrders = await prisma.order.findMany({
            include: { items: true, client: true}
        });
        res.json(allOrders);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Error al obtener todos los pedidos." });
    }
}

export async function getOrderById(req: Request, res: Response) {
    const orderId = parseInt(req.params.id, 10);

    try {
        const order = await prisma.order.findUnique({
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
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Error al obtener el pedido." });
    }
}


export async function getApprovedOrders(req: Request, res: Response) {
    try {
        const now = new Date();
        const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000; // 2 días en milisegundos
        const twoDaysFromNow = new Date(now.getTime() + twoDaysInMillis);

        const approvedOrders = await prisma.order.findMany({
            include: { items: true, client: true},
            where: {
                status: 'Approve',
                shippingPromise: {
                    gte: now,
                    lte: twoDaysFromNow
                }
            }
        });

        res.json(approvedOrders);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Error al obtener pedidos aprobados." });
    }
}

export async function getTravelingOrders(req: Request, res: Response) {
    try {
        const fromDate = new Date(req.query.fromDate as string);
        const toDate = new Date(req.query.toDate as string);

        const travelingOrders = await prisma.order.findMany({
            include: { items: true, client: true},
            where: {
                status: 'Traveling',
                createDate: {
                    gte: fromDate,
                    lte: toDate
                }
            }
        });

        res.json(travelingOrders);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Error al obtener pedidos en tránsito." });
    }
}