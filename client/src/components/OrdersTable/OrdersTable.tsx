import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {Order} from "../../models/Order";

type OrdersTableProps = {
    orders: Order[];
};

const OrdersTable: FC<OrdersTableProps> = ({orders}) => {

    const navigate = useNavigate();

    const handleOrderClick = (order: Order) => {
        navigate(`/order/${order.id}`);
    };

    return (
        <>
        <h2 className="subtitle">Orders List</h2>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Order Date</th>
                <th>Shipping Promise</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order) => (
                <tr key={order.id} onClick={() => handleOrderClick(order)}>
                    <td>{order.id}</td>
                    <td>{order.client.name}</td>
                    <td>{order.createDate.toLocaleDateString()}</td>
                    <td>{order.shippingPromise.toLocaleDateString()}</td>
                    <td>{order.status}</td>
                </tr>))}
            </tbody>
    </table>
            </>);
};

export default OrdersTable;
