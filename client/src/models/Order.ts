import {Client} from "./Client.ts";
import {Item} from "./Item.ts";

export interface Order {
    id: number;
    createDate: Date;
    status: string;
    shippingAddress: string;
    shippingPromise: Date;
    clientId: number;
    client: Client;
    items: Item[];
}