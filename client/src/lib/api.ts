import {Order} from "../models/Order.ts";

export async function fetchAllOrders(): Promise<Order[]> {
    try {
        const url = `http://localhost:3001/orders/all`;
        const response = await fetch(url);
        const data: Order[] = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Hubo un error al obtener todas las órdenes:", error.message);
        } else {
            console.error("Hubo un error al obtener todas las órdenes:", error);
        }
        throw error;
    }
}

export async function fetchOrderById(orderId: number): Promise<Order> {
    try {
        const url = `http://localhost:3001/orders/${orderId}`;
        const response = await fetch(url);
        const data: Order = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Hubo un error al obtener la orden con ID ${orderId}:`, error.message);
        } else {
            console.error(`Hubo un error al obtener la orden con ID ${orderId}:`, error);
        }
        throw error;
    }
}


export async function fetchTravelingOrders(fromDate: string, toDate: string): Promise<Order[]> {
    try {
        const url = `http://localhost:3001/orders/traveling?fromDate=${fromDate}&toDate=${toDate}`;
        const response = await fetch(url);
        const data: Order[] = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Hubo un error al obtener órdenes en tránsito:", error.message);
        } else {
            console.error("Hubo un error al obtener órdenes en tránsito:", error);
        }
        throw error;
    }
}

export async function fetchApprovedOrdersCloseToShippingPromise(): Promise<Order[]> {
    try {
        const response = await fetch('http://localhost:3001/orders/approved');
        const data: Order[] = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Hubo un error al obtener las órdenes aprobadas próximas a su fecha prometida de envío:", error.message);
        } else {
            console.error("Hubo un error al obtener las órdenes aprobadas próximas a su fecha prometida de envío:", error);
        }
        throw error;
    }
}
