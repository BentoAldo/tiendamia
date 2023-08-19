export interface Item {
    id: number;
    title: string;
    description: string;
    url: string;
    price: number;
    quantity: number;
    orderId?: number;
}