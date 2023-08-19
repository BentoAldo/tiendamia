import {Client} from "./Client";
import {Item} from "./Item";

export interface Order {
    id: number;
    createDate: Date;
    status: 'Approve' | 'Cancel' | 'Delivery' | 'Traveling';
    client: Client;
    shippingAddress: string;
    shippingPromise: Date;
    items: Item[];
}