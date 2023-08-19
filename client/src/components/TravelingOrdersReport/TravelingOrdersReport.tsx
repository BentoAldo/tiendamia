import { FC, useState } from 'react';

import { Order } from '../../models/Order.ts';
import OrdersTable from "../OrdersTable";
import { fetchTravelingOrders } from "../../lib/api.ts";

const TravelingOrdersReport: FC = () => {
    const [fromDate, setFromDate] = useState<string>(''); // yyyy-MM-dd
    const [toDate, setToDate] = useState<string>(''); // yyyy-MM-dd
    const [orders, setOrders] = useState<Order[]>([]);

    async function handleFetchOrders() {
        if (fromDate && toDate) {
            console.log(fromDate, toDate);
            const travelingOrders = await fetchTravelingOrders(fromDate, toDate);
            const convertedOrders = travelingOrders.map(order => ({
                ...order,
                createDate: new Date(order.createDate),
                shippingPromise: new Date(order.shippingPromise)
            }));
            setOrders(convertedOrders);
        }
    }

    return (
        <div>
            <h2>Traveling Orders Report</h2>
            <div className="date-controls">
                <div className="date-input">
                    <label>
                        From Date:
                        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    </label>
                </div>
                <div className="date-input">
                    <label>
                        To Date:
                        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                    </label>
                </div>
                <div>
                    <button className="fetch-button" onClick={handleFetchOrders}>Fetch Orders</button>
                </div>
            </div>
            <OrdersTable orders={orders} />
        </div>
    );
};

export default TravelingOrdersReport;
