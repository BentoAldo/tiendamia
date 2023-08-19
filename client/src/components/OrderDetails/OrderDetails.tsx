import { FC, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { fetchOrderById } from '../../lib/api';
import { Order } from '../../models/Order.ts';

const OrderDetails: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        async function getOrderDetails() {
            try {
                const fetchedOrder = await fetchOrderById(Number(id));
                setOrder(fetchedOrder);
            } catch (error) {
                console.error(`Error fetching order with ID ${id}:`, error);
            }
        }

        getOrderDetails();
    }, [id]);

    if (!order) return <p>Loading...</p>;

    return (
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-xl mx-auto mt-12">
            <h2 className="subtitle">
                Order ID: {order.id}
            </h2>
            <ul className="divide-y divide-gray-300">
                {order.items.map((item) => (
                    <li key={item.id} className="p-4 product-card">
                        <h3 className="product-title">{item.title}</h3>
                        <p className="text-gray-600 mb-2 product-description">{item.description}</p>
                        <div className="product-footer">
                            <p className="product-quantity text-gray-700 mb-2">
                                Quantity: {item.quantity}
                            </p>
                            <p className="product-price">
                                ${item.price.toFixed(2)}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderDetails;
