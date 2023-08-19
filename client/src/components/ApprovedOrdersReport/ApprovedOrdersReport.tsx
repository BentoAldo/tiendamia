import { FC, useState, useEffect } from 'react';

import { Order } from '../../models/Order.ts';
import OrdersTable from "../OrdersTable";
import { fetchApprovedOrdersCloseToShippingPromise } from "../../lib/api.ts";

const ApprovedOrdersReport: FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        async function getApprovedOrders() {
            const approvedOrders = await fetchApprovedOrdersCloseToShippingPromise();
            const convertedOrders = approvedOrders.map(order => ({
                ...order,
                createDate: new Date(order.createDate),
                shippingPromise: new Date(order.shippingPromise)
            }));
            setOrders(convertedOrders);
        }

        getApprovedOrders();
    }, []);

    return (
        <div>
            <h2>Approved Orders Close to Shipping Promise</h2>
            <OrdersTable orders={orders} />
        </div>
    );
};

export default ApprovedOrdersReport;
